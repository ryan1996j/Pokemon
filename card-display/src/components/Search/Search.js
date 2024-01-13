import React from 'react'
import './Search.css'
function Search({ handleSubmit, handleInputChange, handleSelectChange, formData }) {

    return (
        <div className='search-container'>
            <form className='input-group' onSubmit={handleSubmit} >
                <div>
                    <input type='text'
                        className='userInput'
                        placeholder='Search'
                        value={formData.searchText}
                        onChange={handleInputChange} />
                </div>


                <div className='select-group'><select id="select1" value={formData.types} onChange={(e) => handleSelectChange(e, 'types')}>
                    <option value="" disabled hidden>Type</option>
                    <option value="Metal">Metal </option>
                    <option value="Dragon">Dragon</option>
                    <option value="Grass">Grass</option>
                    <option value="Lightning">Lightning</option>
                </select></div>

                <div className='select-group'><select id="select2" value={formData.rarity} onChange={(e) => handleSelectChange(e, 'rarity')}>
                    <option value="" disabled hidden>Rarity</option>
                    <option value="Rare Holo">Rare Holo</option>
                    <option value="Common">common</option>

                </select></div>


            </form>




        </div>
    )
}

export default Search
