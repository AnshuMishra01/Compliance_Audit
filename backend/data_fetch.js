const CosmosClient = require('@azure/cosmos').CosmosClient;
const fs = require('fs');
const schedule = require('node-schedule');

// Configuration
const config = {
  endpoint: 'https://unstructured-data.documents.azure.com:443/',
  key: 'KlP5Zb4waukeV1cYxyGiFCbrV58FOAHuVd2onxDV057Vf3wTFXQk2nTTpUzFL0bmNTY0usk6jS45ACDbMyDCew==',
  databases: {
    guideline_summary: {
      id: 'guideline_summary',
      containerId: 'data',
      outputFile: 'guideline_summ.json'
    },
    guideline_categorize: {
      id: 'guideline_categorize',
      containerId: 'container2',
      outputFile: 'guideline_categorize.json'
    },
    ToDoList: {
      id: 'ToDoList',
      containerId: 'Items',
      outputFile: 'cosmosData.json'
    }
  }
};

const client = new CosmosClient({
  endpoint: config.endpoint,
  key: config.key
});

async function retrieveDataFromContainer(databaseId, containerId, outputFile) {
  const database = client.database(databaseId);
  const container = database.container(containerId);

  try {
    const querySpec = {
      query: "SELECT * FROM c"
    };

    const { resources: items } = await container.items.query(querySpec).fetchAll();

    // Convert the items to JSON string
    const jsonData = JSON.stringify(items, null, 2);

    // Write the JSON data to a local file
    fs.writeFileSync(outputFile, jsonData);

    console.log(`Retrieved ${items.length} items and saved to ${outputFile}`);
    return items;
  } catch (error) {
    console.error(`Error retrieving data from ${databaseId}/${containerId}:`, error);
    throw error;
  }
}

async function runAllTasks() {
  console.log('Starting daily data retrieval tasks...');

  for (const [dbName, dbConfig] of Object.entries(config.databases)) {
    try {
      await retrieveDataFromContainer(dbConfig.id, dbConfig.containerId, dbConfig.outputFile);
      console.log(`Completed retrieval for ${dbName}`);
    } catch (error) {
      console.error(`Failed to retrieve data for ${dbName}:`, error);
    }
  }

  console.log('All daily data retrieval tasks completed.');
}

// Schedule the task to run daily at midnight
schedule.scheduleJob('0 0 * * *', function() {
  runAllTasks().catch(console.error);
});

console.log('Data retrieval tasks scheduled to run daily at midnight.');

// Run the tasks immediately on script start (optional)
runAllTasks().catch(console.error);