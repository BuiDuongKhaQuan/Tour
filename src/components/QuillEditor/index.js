import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { Component } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

class QuillEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }, { direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            ['link', 'image', 'video'],
            ['clean'], // Remove formatting button
        ],
        clipboard: {
            // Toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
        history: {
            delay: 2000,
            maxStack: 500,
            userOnly: false,
        },
        syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
        },
    };

    formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'code-block',
        'list',
        'bullet',
        'indent',
        'script',
        'align',
        'direction',
        'color',
        'background',
        'link',
        'image',
        'video',
    ];

    handleChange = (content, delta, source, editor) => {
        this.setState({ text: content });
        if (this.props.onEditorChange) {
            this.props.onEditorChange(content);
        }
    };

    render() {
        return (
            <div className="text-editor">
                <ReactQuill
                    defaultValue={this.state.text}
                    onChange={this.handleChange}
                    theme="snow"
                    modules={this.modules}
                    formats={this.formats}
                >
                    <div className="my-editing-area" style={{ minHeight: '200px' }} />
                </ReactQuill>
            </div>
        );
    }
}

export default QuillEditor;
