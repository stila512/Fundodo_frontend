import { useState, useEffect, useRef } from 'react';
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
          fetch("http://localhost:3001/api/upload2", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((result) => {
              resolve({
                default: result.url
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

export default function CreateArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sort, setSort] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/createArticle', { title, content, sort });
      console.log('Article created:', response.data);
      // 可以在這裡加入成功提示或重定向
    } catch (error) {
      console.error('Error creating article:', error);
      // 可以在這裡加入錯誤處理
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="文章標題"
        required
      />
      <select value={sort} onChange={(e) => setSort(e.target.value)} required>
        <option value="">選擇分類</option>
        <option value="1">領養專區</option>
        {/* 這裡可以加入你的文章分類選項 */}
      </select>
      {editorLoaded ? (
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
          config={{
            extraPlugins: [MyCustomUploadAdapterPlugin],
          }}
        />
      ) : (
        <div>Loading editor...</div>
      )}
      <button type="submit">發布文章</button>
    </form>
  );
}