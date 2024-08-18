import React, { useEffect, useState } from 'react';
import supabase from '../../../utils/supabase';
import { useParams } from 'react-router-dom';
import Project from '../../../Models/Project';
import { useNavigate } from 'react-router-dom';
const EditProject: React.FC = () => {

    const {id} = useParams();
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [picture, setPicture] = useState<null|File>(null);
    const [isPublic, setIsPublic] = useState<boolean>(false); 
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!id || isNaN(parseInt(id))){
            navigate('/admin/projects');
            return;
        }
        Project.get(parseInt(id)).then((data) => {
            if(data){
                setName(data.name);
                setDescription(data.description);
                setLink(data.link);
                setIsPublic(data.public);
            }
        })
    },[]);

    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            setLoading(true);
            let image = '';
            if(picture){
                const name = `${(new Date()).getTime()  + picture?.name}`;
                const {data, error} = await supabase.storage.from('projects').upload(`assets/${name}`, picture);
                if(error){
                    //throw new Error(error.message);
                    console.log(error);
                }else{
                    image = data.path;
                }
                
            }
            const updatedProject = {
                name,description,link, image, public:isPublic
            }
            if(!id || isNaN(parseInt(id))) return
            const success = await Project.update(parseInt(id), updatedProject);
            
            if(success){
                setLoading(false);
                navigate('/admin/projects');
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
            <h1>Edit Project</h1>
            <form onSubmit={formSubmit} id="projectForm">
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" onChange={e=>setName(e.target.value)} required value={name}/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" onChange={e=>setDescription(e.target.value)} required rows={10} value={description}></textarea>
                </div>
                <div>
                    <label htmlFor="link">Link</label>
                    <input type="text" name="link" id="link" onChange={e=>setLink(e.target.value)} required value={link}/>
                </div>
                <div>
                    <label htmlFor="public">Pubblico</label>
                    <input type="checkbox" name="public" id="public" onChange={e=>setIsPublic(e.target.checked)} checked={isPublic} />
                </div>
                <div>
                    <label htmlFor="picture">Immagine</label>
                    <input type="file" name="picture" id="picture" onChange={e=>setPicture(e.target.files?.length ? e.target.files[0] : null)}/>
                </div>
                <div>
                    <button type="submit" disabled={loading}>{loading ? "Salvando..." : "Salva"}</button>
                </div>
            </form>
        </div>
    )
}

export default EditProject;