import React, { useState } from 'react';
import supabase from '../../../utils/supabase';

const CreateProject: React.FC = () => {

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [picture, setPicture] = useState<null|File>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);


    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            setLoading(true);
            let image = null;
            console.log(await supabase.auth.getUser());
            console.log(picture)
            if(picture){
                const name = `${(new Date()).getTime()  + picture?.name}`;
                console.log(name);
                const {data, error} = await supabase.storage.from('projects').upload(`assets/${name}`, picture);
                if(error){
                    //throw new Error(error.message);
                    console.log(error);
                }else{
                    image = data.path;
                }
                
            }
            const newProject = {
                name,description,link,image
            }
            const { data, error } = await supabase
            .from('Projects')
            .insert([
            newProject
            ])
            .select()
            if(data){
                console.log(data);
                setLoading(false);
            }
            if(error){
                console.log(error);
            }
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }


    return (
        <div>
            <h1>Create Project</h1>
            <form onSubmit={formSubmit} id="projectForm">
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" onChange={e=>setName(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" onChange={e=>setDescription(e.target.value)} required rows={10}></textarea>
                </div>
                <div>
                    <label htmlFor="link">Link</label>
                    <input type="text" name="link" id="link" onChange={e=>setLink(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="picture">Immagine</label>
                    <input type="file" name="picture" id="picture" onChange={e=>setPicture(e.target.files?.length ? e.target.files[0] : null)}/>
                </div>
                <div>
                    <button type="submit" disabled={loading}>{loading ? "Salvando..." : "Create"}</button>
                </div>
            </form>
        </div>
    )
}

export default CreateProject;