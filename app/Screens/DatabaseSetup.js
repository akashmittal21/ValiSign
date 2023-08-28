import SQLite from "react-native-sqlite-storage";

const encryptionKeys = [
  "T5$okm.$DgZk2Ub.6AJZs%/Cn5pPvRCu",
  "Qy2fAMzYFZfqZzkcelcafohr%otYx^kx",
  ".rkZG^qlBiNc&Zm4byRdXgi8ekvwlLbW",
  "RsUQ&talPqu7C^tRHA&qyE$0Fg^RhK57",
  "xX.u42bQ6HoamUc8OBXqLT9fhNy&a8b1",
  ".ZC.1a4ZmQfVCOYKD9OANKI9SbgEGXUt",
  "SdEoDJepnzz61zjwKuDyB9&.Q6Se3$w.",
  "D/2FC5N6PVdd&g1QAC$CDl.4OHunESkZ",
  "gYF%z07%ekh./P/X.e0LZ4kMHj14BY.o",
];

const db = SQLite.openDatabase(
  { name: "localDatabase.db", location: "default" },
  () => {},
  (error) => {
    console.log("Error opening database: ", error);
  }
);

const createTables = async () => {
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

    // Pre-existing random keys set of 8 remove them after initialization
    // after the app update it's going to be configured again
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS EncryptionKeys (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT)",
      [],
      () => {
        console.log("EncrypyionKeys table created successfully");

        for (const key of encryptionKeys) {
          tx.executeSql(
            "INSERT INTO EncryptionKeys (key) VALUES (?)",
            [key],
            () => {
              console.log("Encryption Key stored successfully");
            },
            (error) => {
              console.log("Error storing encryption keys: ", error);
            }
          );
        }
      },
      (error) => {
        console.log("Error creating EncryptionKeys table: ", error);
      }
    );

    // TODO: Time needs to be stored as UTC and displayed in the local time zone
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS TransactionLogs (id INTEGER PRIMARY KEY AUTOINCREMENT, application TEXT, transactionStatus TEXT, transactionMessage TEXT, dateTime TIMESTAMP)",
      [],
      () => {
        console.log("TransactionLogs table created successfully");
      },
      (error) => {
        console.log("Error creating TransactionLogs table: ", error);
      }
    );

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS LoginDetails (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)",
      [],
      () => {
        console.log("LoginDetails table created successfully");
      },
      (error) => {
        console.log("Error creating LoginDetails table: ", error);
      }
    );

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)",
      [],
      () => {
        console.log("LoginDetails table created successfully");
      },
      (error) => {
        console.log("Error creating LoginDetails table: ", error);
      }
    );
  });
};

export const getEncryptionKeys = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM EncryptionKeys",
        [],
        (_, resultSet) => {
          const keys = [];
          for (let i = 0; i < resultSet.rows.length; i++) {
            keys.push(resultSet.rows.item(i).key);
          }
          resolve(keys);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const deleteLocalTable = (tableName) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE IF EXISTS ${tableName}`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export default createTables;
