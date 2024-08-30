import SearchBar from "../components/SearchBar"
import TabsComponent from "../components/Tabs"
import UserTable from "../components/UserTable"

export default function UsesPages() {

 const users = [
  {
    "id": 1,
    "name": "Emiliano Nicolas Navarrete Rivera",
    "career": "CS",
    "totalLogs": 30,
    "matricula": 369153,
    "lastLogin": "2023-07-12 10:42 AM",
    "image": "/placeholder.svg"
  },
  {
    "id": 2,
    "name": "Hypernova Headphones",
    "career": "Active",
    "totalLogs": 100,
    "matricula": 100,
    "lastLogin": "2023-10-18 03:21 PM",
    "image": "/placeholder.svg"
  },{
    "id": 3,
    "name": " Headphones",
    "career": "Active",
    "totalLogs": 100,
    "matricula": 100,
    "lastLogin": "2023-10-18 03:21 PM",
    "image": "/placeholder.svg"
         

     }
  // Add more users as needed
]

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">

          <SearchBar />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <TabsComponent>
            <UserTable users={users} />
          </TabsComponent>
        </main>
      </div>
    </div>
  )
}