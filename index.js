const ROOT = document.getElementById('root')

class Editor extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <textarea id="editor" value={this.props.inputValue} onChange={this.props.handleChange}></textarea>
        )
    }
}
class Preview extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div id="preview" dangerouslySetInnerHTML={this.props.markedContent}></div>
        )
    }
}
class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            inputValue: `# The Markdown Previewer
            ## created using marked api
            `
        }
        this.handleChange = this.handleChange.bind(this)
        this.renderMarkup = this.renderMarkup.bind(this)
    }
    handleChange(event){
        this.setState({
            inputValue: event.target.value
        })
        console.log(this.renderMarkup())
    }
    renderMarkup(){
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false
        })
    
        var rawMarkup = marked(this.state.inputValue, {sanitize: true})
        return {
            __html: rawMarkup
        }
    }
    render(){
        return (
        <div>
        <Editor inputValue={this.state.inputValue} handleChange={this.handleChange}/>
        <Preview markedContent={this.renderMarkup()}/>
        </div>
        )
    }
}
ReactDOM.render(<App />, ROOT)