import { useState, useEffect, useRef } from 'react';
import scss from '@/pages/article/editor.module.scss';
import axios from 'axios';

const MyUploadAdapter = class {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then(
            (file) =>
                new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append("articleImage", file);
                    fetch("http://localhost:3005/api/article/upload2", {
                        method: "POST",
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((result) => {
                            const imageUrl = result.url.startsWith('http')
                                ? result.url
                                : `http://localhost:3005${result.url}`;
                            resolve({
                                default: imageUrl,
                                imageId: result.imageId
                            });
                        })
                        .catch(reject);
                })
        );
    }
};

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
    };
}

export default function Editor({ content, setContent,editorHei, onReady }) {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const editorRef = useRef();
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
        };
        setEditorLoaded(true);
    }, []);
    return (
        <>
            <div className={scss.editorWrapper} style={{ '--editor-height': editorHei }}>
                {editorLoaded ? (
                    <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                        }}
                        onReady={(editor) => {
                            if (onReady) {
                                onReady();
                            }
                        }}
                        config={{
                            extraPlugins: [MyCustomUploadAdapterPlugin],
                        }}
                    />
                ) : (
                    <div>Loading editor...</div>
                )}
            </div>


        </>
    )
}
