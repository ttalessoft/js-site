const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const videos = require('./data');

server.use(express.static('public'));
server.set('view engine', 'njk');

nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true,
});

server.get('/', (req, res) => {
  const data = {
    avatar_url:
      'https://avatars2.githubusercontent.com/u/19892264?s=400&u=4e1610ed47c5d4a0caf9b501aa0ef558a442e3cd&v=4',
    title: 'Ttales R G S Silva',
    sub_title: 'Desenvolvedor - Nexttec',
    description:
      'GitHub is built for collaboration. Set up an organization to improve the way your team works together, and get access to more features. <a href="https://nexttec.com.br" target="_black">nexttec</a>',
    link: [
      {
        name: 'Github',
        url: 'https://github.com/ttalessoft',
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/ttalessoft',
      },
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/ttales-roger-garbim-56355553/ ',
      },
    ],
  };
  return res.render('sobre', {
    dados: data,
  });
});

server.get('/aulas', (req, res) => {
  return res.render('aulas', {
    itens: videos,
  });
});

server.get('/video', (req, res) => {
  const id = req.query.id;

  const video = videos.find((video) => {
    if (video.id === id) {
      return true;
    }
  });

  if (!video) {
    return res.send('Vídeo não encontrado! ');
  }

  return res.render('video', {
    item: video,
  });
});

server.listen(5000, () => {
  console.log('server run');
});
