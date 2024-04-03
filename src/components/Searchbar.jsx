import * as Unicons from '@iconscout/react-unicons'
export default function Searchbar() {
    return (
        <div className='flex flex-row items-center'> {/* Header */}
        <input
          id="search"
          className='w-64 rounded-lg h-10 p-2 my-2 bg-transparent focus:outline-none'
          type='text'
          placeholder='Search City'
        />
        <button
          id="button"
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
        >
          <Unicons.UilSearch size={20} color='#000' className='right-8' />
        </button>
      </div>
    );
}