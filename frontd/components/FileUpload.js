import React, { Fragment, useState} from 'react'
import axios from 'axios';

 const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Escolha o arquivo');
    const [uploadedFile, setUploadedFile] = useState({});
    const onChange = e => {
        setFile(e.target.files);
        setFilename(e.target.files.name);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const {fileName, filePath} = res.data;

            setUploadedFile({ fileName, filePath});

        } catch(err) {
            if(err.response.status===500) {
                console.log('Houve um problema com o servidor');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }

    return (
        <Fragment>
         <form onSubmit={onSubmit}>
            <div className='custom-file mb-4'>
              <input type='file' 
              className="custom-file-input" 
              id="customFile" 
              onChange={onChange}/>
              <label className="custom-file-label" htmlFor='customFile'>
              {filename}
              </label>
            </div>

            <input 
            type='submit'
            value='upload' 
            className='btn btn-primary btn-block mt-4' />
         </form>
         { uploadedFile ? <div className="row mt-5">
            <div className="col-md-6 m-auto">
                <h3 className="text-center">{ uploadedFile.fileName}</h3>
                <img style= {{width:'flex'}} src={uploadedFile.filePath} alt="" />
            </div>
    </div> : null }
        </Fragment>
    );
};

export default FileUpload
