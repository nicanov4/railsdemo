import React from 'react';

const TextInput = (field) => (
        <div className="input-row">
	
	<input {...field.input} type="text"/>
	{field.meta.touched && ((field.meta.error && <span>{field.meta.error}</span>) || (field.meta.warning && <span>{field.meta.warning}</span>))}
    </div>
);


export default TextInput;
