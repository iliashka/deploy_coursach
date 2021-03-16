import React from 'react'
import CreatableSelect from 'react-select/creatable';

function Tags({tags, setTags, preTags, setPreTags}) {
    const [count, setCount] = React.useState(0) 
    var arr = []
    const handleChange = (newValue, actionMeta) => {
        setCount(count + 1)
        console.log(newValue[count]);
        arr.slice(0, arr.length)
        arr.push(newValue)
        console.log(`action: ${actionMeta.action}`);
        setPreTags(arr)
      };
    return (
        <div>
            <CreatableSelect
                placeholder='Введите Ваши теги или выберите существующие'
                options={tags.map((e) => {
                    return e
                })}
                isClearable
                isMulti
                onChange={handleChange}
            />
        </div>
    )
}

export default Tags
