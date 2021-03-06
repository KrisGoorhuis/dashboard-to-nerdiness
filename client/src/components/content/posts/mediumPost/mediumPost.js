import React from 'react'
import './mediumPost.css'

let MediumPost = (props) => {

   // Modified from https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
   function timeConverter(time) {
      var a = new Date(Date.parse(time));
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      // var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes()
      // var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
      // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      // year and removed:
      // var time = date + ' ' + month + ' ' + ' ' + hour + ':' + min;
      var time = `${date} ${month} ${hour}:${min}`

      return time;
   }

   return (
      <a
         className="medium_post_container"
         href={props.post.link}
         target="_blank"
         rel="noopener noreferrer"
      >
         <h5 className="medium_post_title">{props.post.title}</h5>
         <section className="medium_post_details">
            <small>{props.post.mediumPublication}</small>
            <small>{props.post.isoDate}</small>
            <small className="medium_post_author">{props.post.creator}</small>
            {/* <img src={props.post.thumbnail} /> */}
         </section>
      </a>
   )
}

export default MediumPost

// categories: (3) ["sales", "business", "startup"]
// content:encoded: "<p>Why are questions so important in persuasion, management, and conveying ideas effectively? Because you demonstrate expertise through questions, not answers. This is a simple, yet challenging concept — and like many highly effective concepts, it is counter-intuitive.</p><p>Answers are supposed to represent our knowledge of a subject. Our education system is built on providing answers to demonstrate we’ve learned something. Answers do, to a degree, reflect our knowledge and understanding. However, whenever you are persuading someone to believe and trust you, answers are merely the ticket into the game. Once the game begins, you need to be able to go beyond being able to answer questions the other person expects you to be able to answer. You need to be able to ask direct, meaningful, thoughtful, probing questions — and invite them to arrive at your way of thinking organically.</p><h3>The Art &amp; Science of the Socratic Method</h3><p>The vast knowledge it takes to answer questions quickly and effectively surely positions you as an expert, doesn’t it? Yes, but it turns out answers really only serve two purposes.</p><p><strong>First, answers confirm at a fundamental level the questioner should be speaking with you.</strong></p><p><strong>Second, answers validate you have a minimum depth of knowledge that allows the conversation to continue.</strong></p><p>Answering questions effectively just keeps you in the conversation, but eventually they answers aren’t enough to convince and persuade the way questions do.</p><p>Questions drive differentiation. Your competitors (and there are competitors in every situation, even if they are just other requests on the other person’s time) won’t be asking the hard, insightful questions. They will think they are nailing it by answering all the questions of the questioner. Your ability to ask killer questions communicates your intent of having a different kind of conversation and you demonstrate compelling expertise.</p><p>Killer questions are important in any persuasive setting including but not limited to selling, interviewing, seeking investment, and dating.</p><p>So why does asking killer questions matter more than having good answers?</p><h3>Differentiate with Shared Curiosity</h3><p>Really, really good questions communicate you know what you are talking about. You can’t ask effective questions without having specific, relevant experience and expertise to generate the question. Sometimes the other person doesn’t know what questions they should be asking. They will ask basic questions that anyone worth their salt can nail. They have a limited a view and experience to tap into to ask questions. So, although you might be able to answer all of the other person’s questions, if the right answers can be provided by most other people, you aren’t demonstrating any unique expertise.</p><p>Many sales training programs have highlighted the importance of questions, including design thinking protocols like the <a href="https://en.wikipedia.org/wiki/5_Whys">5 Whys</a>. That said, the methodology around what to say and how to ask the right questions doesn’t matter nearly as much as your own intent and thoughtfulness around questions. If you truly have the other person’s best interest in mind then you will develop and ask questions that demonstrate your desire to understand and to share your knowledge from a common place of understanding. Asking your questions partner to explain their views or define key concepts is a great start in building one another’s understanding. Intent matters far more than methodology or process when it comes to asking killer questions.</p><h3>Building Rapport &amp; Positive Feedback Loops</h3><p>How many times have you heard “That’s a great question” recently as part of important conversations? If not many or at all, I would suspect you aren’t asking killer questions which means you aren’t demonstrating understanding and communicating expertise. If you are hearing something more like “Thanks for the information,” you need to step up your ability to ask killer questions.</p><p><strong>You develop killer questions with time, thought, and research.</strong></p><p>Sounds like work? It is. But you’ll see the effect of this practice in those who seem like naturals, being able to pick up on queues within a conversation to ask killer questions and drive discussions in interesting directions — often, in directions they’d like to see it go. But almost all of us have to put in the work.</p><p>If a conversation you are going to have is important enough to you that you care about the outcome, then put in the time, thought, and research to come up with killer questions. For some situations you might only need an hour to come up with killer questions, and for others you might need weeks. Put in the time and the work. If you do, your intent, effort, and expertise will shine through.</p><p>Specifically, killer questions will be ones that put you both on a path to common understanding, create opportunities to teach one another a fresh perspective, and generally originate from a place of humble inquisitiveness rather than arrogant strategizing.</p><p>Be present and have dexterity of thought within a conversation, too. If the other person says something interesting that has significant ramifications to what you are discussing or is just plain interesting, dig into it. Lean on your intent to understand and learn. Remember, this is less about methodology and process than intent. If the other person knows what they are saying is impactful they will be looking to see how you respond to it and whether you seek to understand it. Often this happens subconsciously, especially if the conversation has been mostly a basic question and answer session so far.</p><p>If you take away nothing else from this, please remember killer questions are exponentially better at demonstrating your expertise than answers are.</p><p><strong>You should assume anyone can provide good answers. You, however, can ask killer questions.</strong></p><p><em>Originally posted on www.startupgrind.com.</em></p><img src="https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=cf568311fed" width="1" height="1"><hr><p><a href="https://medium.com/the-launchism/questions-demonstrate-expertise-more-than-answers-do-cf568311fed">Questions demonstrate expertise more than answers do.</a> was originally published in <a href="https://medium.com/the-launchism">The Launchism</a> on Medium, where people are continuing the conversation by highlighting and responding to this story.</p>"
// creator: "Ryan Frederick"
// dc:creator: "Ryan Frederick"
// guid: "https://medium.com/p/cf568311fed"
// isoDate: "2015-11-24T19:09:43.000Z"
// link: "https://medium.com/the-launchism/questions-demonstrate-expertise-more-than-answers-do-cf568311fed?source=rss----9d5ca34471a9---4"
// mediumPublication: "the-launchism"
// pubDate: "Tue, 24 Nov 2015 19:09:43 GMT"
// title: "Quest