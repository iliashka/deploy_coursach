import React from 'react'
import CreatableSelect from 'react-select/creatable';

function Tags({tags, setTags, preTags, setPreTags, lang}) {
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
                placeholder={lang===false?'Enter your tags or select existing ones':'Введите Ваши теги или выберите существующие'}
                options={tags && tags.map((e) => {
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
