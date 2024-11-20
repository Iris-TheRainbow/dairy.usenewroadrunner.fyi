function loadCode(){
    fetch("/samples/SilkRoad.java")
        .then((res) => res.text())
        .then((text) => {
            document.getElementById("silkroad").innerHTML = `
<pre><code style="background-color: #282828; color: azure; font-size: 1.5rem;">
` 
+ text + 
`</code></pre>`;
    });
    fetch("/samples/MercurialAction.java")
        .then((res) => res.text())
        .then((text) => {
            document.getElementById("mercact").innerHTML = `
            <pre><code class="language-java" style="background-color: #282828; color: azure; font-size: 1.5rem;">
`+ text + `
            </code></pre>`;
    });
    new Promise(resolve => setTimeout(resolve, 150)).then(() => {hljs.highlightAll();});
}