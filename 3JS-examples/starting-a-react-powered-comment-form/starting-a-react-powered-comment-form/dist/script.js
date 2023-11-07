// App
// Smart. Does data stuff.
var App = React.createClass({ displayName: "App",

  getInitialState: function () {
    return {
      comments: {} };

  },

  addComment: function (commentData) {

    (foo, bar, ...args) => {

    };

    var timeStamp = new Date().getTime();

    this.state.comments['comment-id' + timeStamp] = commentData;
    this.setState({
      comments: this.state.comments });

  },

  renderComment: function (key) {
    return /*#__PURE__*/(
      React.createElement("li", { className: "" }, /*#__PURE__*/
      React.createElement(NewComment, { key: key, index: key, details: this.state.comments[key] })));


  },

  render: function () {
    return /*#__PURE__*/(
      React.createElement("div", { className: "row medium-8 large-7 columns" }, /*#__PURE__*/

      React.createElement("ol", { className: "comment-list block-comments" },

      Object.
      keys(this.state.comments)
      // Creating a NEW array
      .map(this.renderComment)), /*#__PURE__*/



      React.createElement(AddCommentForm, { addComment: this.addComment }), /*#__PURE__*/

      React.createElement("pre", null, JSON.stringify(this.state, null, 2))));



  } });


/*
  Add comment Form
  <AddCommentForm />
*/
// Semi-Dumb
var AddCommentForm = React.createClass({ displayName: "AddCommentForm",

  processComment: function (event) {
    event.preventDefault();

    // 1. Take data from from form
    var commentData = {
      commentName: this.refs.name.value,
      commentBody: this.refs.desc.value };


    // 2. Pass data back to App
    this.props.addComment(commentData);

    // 3. Reset the form
    this.refs.commentForm.reset();

  },

  render: function () {
    return /*#__PURE__*/(
      React.createElement("div", { className: "callout secondary" }, /*#__PURE__*/
      React.createElement("h4", { className: "leave-comment" }, "Add a Comment"), /*#__PURE__*/
      React.createElement("form", { className: "post-edit", ref: "commentForm", onSubmit: this.processComment }, /*#__PURE__*/
      React.createElement("input", { type: "text", ref: "name", placeholder: "Your Name", required: true }), /*#__PURE__*/
      React.createElement("textarea", { ref: "desc", placeholder: "Add your comment here", required: true }), /*#__PURE__*/
      React.createElement("button", { id: "submit", type: "submit", className: "button button-outline comment-button action-button expand-right" }, "Add Comment"))));



  } });



/*
  Newcomment
  <NewComment />
*/
var NewComment = React.createClass({ displayName: "NewComment",
  render: function () {
    return /*#__PURE__*/(
      React.createElement("div", { className: "block-comment-content module text" }, /*#__PURE__*/
      React.createElement("div", { className: "comment-user" }, /*#__PURE__*/
      React.createElement("div", { className: "comment-user-avatar-wrap" }, /*#__PURE__*/
      React.createElement("a", null, /*#__PURE__*/
      React.createElement("img", { src: "//s3-us-west-2.amazonaws.com/s.cdpn.io/3/profile/profile-512_29.jpg", className: "comment-avatar", alt: "" }))), /*#__PURE__*/


      React.createElement("div", { className: "comment-user-text" }, /*#__PURE__*/
      React.createElement("a", { href: "#0", "data-username": "cathbailh", className: "comment-username" }, /*#__PURE__*/
      React.createElement("span", { className: "username" },
      this.props.details.commentName)), /*#__PURE__*/


      React.createElement("span", { className: "on" }, " on "), /*#__PURE__*/
      React.createElement("a", { href: "#0" }, /*#__PURE__*/
      React.createElement("time", { className: "block-comment-time" },
      h.getTime())))), /*#__PURE__*/





      React.createElement("div", { className: "comment-text" }, /*#__PURE__*/
      React.createElement("p", null, this.props.details.commentBody))));




  } });



React.render( /*#__PURE__*/React.createElement(App, null), document.querySelector("#main"));