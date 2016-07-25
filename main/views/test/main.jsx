var React = require('react');
var DefaultLayout = require('./layout.jsx')

var HelloMessage = React.createClass({
  render: function() {
/* var test = [];
    for(var i=0; i<10; i++){
    test.push(<div id = {i}>abc</div>); 
    }
    var a = this.props.title
*/
    return (
<div>aa</div>
/*       <DefaultLayout title= {a}>
            <div className="hello {a}">
                Hello {this.props.name}
                {test}
            </div>
</DefaultLayout>
*/
    );
  }
});

module.exports = HelloMessage;
