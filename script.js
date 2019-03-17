/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. 
 * 
 * This code was created with the sole purpose of being sarcastic. I
 * don't actually meme this hard in real production scenarios. Maybe. */

let introduction = `Fullstack developer, bloat hater, CSS masochist.`

let languages = {
	"JavaScript": `Language I use for web development. Not my cup of tea, nor are large bloated frameworks like ReactJS. For most of my hobby projects, vanilla JS or <a href="https://github.com/cferdinandi/reef">Reef</a> is almost always my goto. That said, PreactJS (a lighter ReactJS drop-in) looks very promising and I'm eager to learn it.`,
	"Bash":       "I used to do a lot of projects of mine in this language, simply because it's fun to write, it runs on any Linux systems and it's in the majority of Linux systems. Bash also helps me a lot when it comes to using Linux, hence why some projects of mine are in Bash. I'm a performance guy, which means almost all of my Bash things use pure Bash, and not <code>awk</code> or <code>sed</code>.",
	"Golang":     "Go is my Go-to pick for a language. It can be statically compiled on multiple architectures without the help of libcs, so I can run it on my Alpine laptop, my shared host or even my phone. The syntax is very easy, legible and likeable, unlike other languages such as Rust. \nPreferred compiler: <code>CGO_ENABLED=0 gc</code>",
	"HTML":       "Well, with CSS of course. I'm a CSS masochist, after all.",
}

let projects = {
	"6cord": {
		url: "https://6cord.diamondb.xyz/",
		image: "https://6cord.diamondb.xyz/6cord.png",
		description: "Made out of anger at Discord, I've decided to make my own version of their clients.",
	},
	"transmission-web": {
		url: "https://gitlab.com/diamondburned/transmission-web",
		image: "",
		description: "What I believe to be the harmony between reactive websites and server-side rendering.",
	},
	"noschat": {
		url: "https://gitlab.com/diamondburned/noschat",
		image: "",
		description: "A proof-of-concept that a decent chat website could be done without JS. I recommend checking https://sr.ht if you're interested.",
	},
	"Butterfly Bot": {
		url: "https://butterfly.diamondb.xyz",
		image: "https://butterfly.diamondb.xyz/images/bot.png",
		description: "A multi-functional osu! bot initially made for me and a bunch of friends. WIP rewrite in Go."
	},
	"Moddage": {
		url: "https://moddage.site",
		image: "https://moddage.site/themes/default-dark/images/favicon.ico\" style=\"image-rendering: optimizeSpeed; image-rendering: pixelated;", // shaddup, whatever works
		description: `A Team Fortress 2 community operated by me and my friend. The "cause" of my Linux sysadmin skill.`
	},
}

function appendprojects(set) {
	var html = ""
	if (!set) {
		return
	}

	html += '<table class="ProjectsLarge">'

	for (var key in set) {
		html += `
			<tr class="ProjectsLarge">
			<td class="avatar">
			<div class="avatar ProjectsLarge">${generateGitLabAvatar(set[key].image, key)}</div>
			</td>
		
			<td class="description">
			<div class="description">
		
			<h2 class="description dark"><a href="${set[key].url}" class="description dark">${key}</a></h2>
		
			<p class="description dark">${set[key].description}</p>
		
			</div>
			</td>

			</tr>
		`
	}

	html += '</table>';

	document.querySelector('div.desc.content-box2').innerHTML = html;
}

function appendlang(set) {
	var html = ""
	if (!set) 
		return

	html += '<table class="Languages">'

	for (var key in set) {
		html += `
			<tr class="Languages">

			<td class="avatar">
			<div class="avatar Languages"><img class="avatar" src="images/${key}.png" /></div>
			</td>

			<td class="description">
			<div class="description Languages">

			<h2 class="description Languages">${key}</h2>

			<p class="description Languages">${set[key]}</p>

			</div>
			</td>

			</tr>
		`
	}

	html += '</table>';

	document.querySelector('div.desc.content-box1').innerHTML = html;
}

function mouseOver() {
	document.querySelector('p.titleB').style.display = 'table-cell';
	document.querySelector('p.titleA').style.display = 'none';
};

function mouseOut() {
	document.querySelector('p.titleB').style.display = 'none';
	document.querySelector('p.titleA').style.display = 'table-cell';
};

// http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
function replaceURLWithHTMLLinks(text) {
	var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	return text.replace(exp,"<a href='$1'>$1</a>"); 
}

function loadgitlab(response) {
	var projects = JSON.parse(response);
	var html = "";

	// blacklisting projects
	var exclude = new Set(['ging-banter-forefront-collab', 'go-nhentai']); // name only

	html += '<table class="Projects">'
	html += "\n"

	for (i=0; i < projects.length; i++) {
		if (exclude.has(projects[i].name))
			continue

		html += '<tr class="Projects">';
		html += '<td class="avatar">';

		html += generateGitLabAvatar(projects[i].avatar_url, projects[i].name)

		html += `
			</td>
			<td class="project">
			<div class="project">
			<h2 class="project"><a class="project" href="${projects[i].web_url}">diamondburned/${projects[i].name}</a></h2>
			<p class="project">${replaceURLWithHTMLLinks(projects[i].description)}</p>
			</div>
			</td>
		`

		html += '</tr>';
	};

	html += '</table>';

	document.querySelector('div.desc.content-box3').innerHTML = html;
};

function generateGitLabAvatar(url, name, p, s) {
	if (url) {
		return `<div class="avatar" style="background: url(${p ? p + "/" : ""}${url}${s ? s + "/" : ""});"></div>`
	} else {
		initial = name.charAt(0);
		return `<div class="avatar" style="background: #FBE9E7;"><p class="avatar initial">${initial}</p></div>`
	}
}

// 404 background
function check(url) {
	var args = url.split('?');
	if (args.indexOf('404') > -1) {
		document.body.style.background = "url('404.png') repeat";
		document.body.style.backgroundSize = "10%";
	}
};

// Quick function to initialize the site, async sucks anyway
async function onstart() {
	mouseOut();
	check(document.URL);
	appendlang(languages);
	appendprojects(projects);
}

// Get the GitLab projects
var request = new XMLHttpRequest();
request.onreadystatechange = (function() {
	if (this.readyState == 4 && this.status == 200) {
		loadgitlab(this.responseText);
	}
});

request.open("GET", "https://gitlab.com/api/v4/users/2388952/projects");
request.send();
