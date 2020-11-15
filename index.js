const ROOT = document.getElementById('root')
const DEFAULT_MD = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`
// function crtobr(text){
//     var count = 0
//     for(let i of text){
//         if (i === '\n')
//         count++
//     }
//     return count
// }

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
            inputValue: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.renderMarkup = this.renderMarkup.bind(this)
    }
    componentDidMount(){
        this.setState({
            inputValue: DEFAULT_MD
        })
    }
    handleChange(event){
        this.setState({
            inputValue: event.target.value
        })
        // console.log(this.renderMarkup())
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
        <div className='wrapper'>
        <Editor inputValue={this.state.inputValue} handleChange={this.handleChange}/>
        <Preview markedContent={this.renderMarkup()}/>
        </div>
        )
    }
}

ReactDOM.render(<App />, ROOT)