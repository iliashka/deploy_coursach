import React from 'react'

function SearchBar({keyword, setKeyword}) {
    return (
        <div>
            <input
            className="form-control mr-md-4"
            style={{width: '20em'}}
            type='search'
            key='random1'
            value={keyword}
            placeholder='Поиск'
            onChange={(e) => setKeyword(e.target.value)}
            
            />
        </div>
    )
}

export default SearchBar
