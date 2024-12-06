import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export const connection = mysql.createConnection({
    host: process.env.RDS_ENDPOINT,
    user: process.env.RDS_USER,
    port: process.env.RDS_PORT,
    password: process.env.RDS_PASSWORD,
    connectTimeout: 1000
})

export const DB = ()=>{
    connection.connect(err => {
        if (err) {
            console.error("Error connecting to RDS:", err);
            return; // Exit the function if there's an error
        }
        console.log("connected to RDS...  :)")
        connection.query('CREATE DATABASE IF NOT EXISTS main;', (err) => {
            if (err) throw err
            console.log("Database created")
            connection.changeUser({ database: 'main'}, (err) => {
                if (err) throw err
                createTable()
            
            }) 
            
        });
    })
}


const createTable = ()=>{
    connection.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT PRIMARY KEY, ip varchar(100));', err => {
        if (err) throw err
        console.log("table has been created")
    })
}
