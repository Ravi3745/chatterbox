export default function SearchList({ searchResults, accessChat, groupModal, handleGroup }) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {searchResults.map((person) => (
        <li key={person.email} className="flex justify-between gap-x-6 py-5 cursor-pointer" onClick={groupModal ? () => handleGroup(person) : () => accessChat(person._id)}>
          <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.pic} alt={person.name} />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
