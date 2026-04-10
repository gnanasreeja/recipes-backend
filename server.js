const express = require("express");
const cors = require("cors");
const neo4j = require("neo4j-driver");

const app = express();
app.use(cors());

const driver = neo4j.driver(
  "neo4j+s://176f9cf8.databases.neo4j.io",
  neo4j.auth.basic("neo4j",
"dOwvTE2VxCSqUwBsF692ieBt1HOA5XfYCzqHzbb57qs")
);

// API to get recipes
app.get("/recipes", async (req, res) => {
    const session = driver.session();

    try {
        const result = await session.run("MATCH (r:Recipe) RETURN r");

        const recipes = result.records.map(record => {
            const r = record.get("r").properties;
            return {
                name: r.name,
                time: r.time,
                difficulty: r.difficulty
            };
        });

        res.json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching recipes");
    } finally {
        await session.close();
    }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
});
