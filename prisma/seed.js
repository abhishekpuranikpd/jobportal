const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log("Deleting all records from the Post collection...")
  
  // Delete all records in the 'Post' table
  await prisma.AIResumeGeneratedData.deleteMany()
  
  console.log("All records in the Post collection have been deleted.")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
