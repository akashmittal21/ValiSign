import SQLite from "react-native-sqlite-storage";

const db = SQLite.openDatabase(
  { name: "localDatabase.db", location: "default" },
  () => {},
  (error) => {
    console.log("Error opening database: ", error);
  }
);

const createTables = () => {
  db.transaction((tx) => {
    // Table to track first-time usage
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS FirstTimeUsage (id INTEGER PRIMARY KEY AUTOINCREMENT, isFirstTime INTEGER, userDataKey TEXT)",
      [],
      () => {
        console.log("FirstTimeUsage table created successfully");
      },
      (error) => {
        console.log("Error creating FirstTimeUsage table: ", error);
      }
    );

    // Pre-existing random keys set of 8
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS EncryptionKeys (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT)",
      [],
      () => {
        console.log("EncrypyionKeys table created successfully");
      },
      (error) => {
        console.log("Error creating EncryptionKeys table: ", error);
      }
    );

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS TransactionLogs (id INTEGER PRIMARY KEY AUTOINCREMENT, application TEXT, transactionStatus TEXT, transactionMessage TEXT)", // Need to add fields
      [],
      () => {
        console.log("TransactionLogs table created successfully");
      },
      (error) => {
        console.log("Error creating TransactionLogs table: ", error);
      }
    );
  });
};

export default createTables;
