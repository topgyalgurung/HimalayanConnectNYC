import { addLocations } from "./addLocations";

async function main() {
  console.log("Starting to add locations...");
  const result = await addLocations();
  console.log("Result:", result);
  process.exit(0);
}

main().catch((error) => {
  console.error("Error running script:", error);
  process.exit(1);
}); 