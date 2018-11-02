import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

import '../css/base.css';

import 'CommentBox.js';
import 'CommentForm.js';


var data = [
  {id: 1, author: "Matt Getz", text: "This is my comment"},
  {id: 2, author: "Michel Momeyer", text: "I do not know"}
];


ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);
