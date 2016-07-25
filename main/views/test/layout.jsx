var React = require('react');

var DefaultLayout = React.createClass({
  render: function() {
    return (
      <html>
        <head><title>{this.props.title}</title></head>
        <body>
			<h1>This is body</h1>
			{this.props.children}
		</body>
      </html>
    );
  }
});

module.exports = DefaultLayout;
