import React from "react";

export default function UpperLabel() {
    return (   
        <div className='flex items-center justify-between border-b-1 bg-white shadow-sm p-1 pl-6 pr-6 mb-2'>
            <h1 className='text-sm'>Course Overview</h1>
            <div>
                <input type='text' name='search' className='border-2 w-96 mr-2' />
                <input type='button' value="Search" className='p-1 pl-3 pr-3 border-none'/>
            </div>
        </div>
    );
};