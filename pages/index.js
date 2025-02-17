import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import defaultImage from '../src/img/mabel-left.png';
import backgroundTelaInicial from '../src/img/backgroundTI.png';
import backgroundTelaInicialSmall from '../src/img/backgroundTIsmall.png';

function Title(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
      ${Tag} {
        color: ${appConfig.theme.colors.neutrals
        ['000']};
        font-size: 24px;
        font-weight: 600;
      }
      `}</style>
    </>
  );
}

// // Componente react
// function HomePage() {
//   // JSX
//   return (
//     <div>
//       <GlobalStyle/>
//       <Title tag="h2">Iniciando Mergulho...</Title>
//       <h2>Aluracord</h2>

//     </div>
//   );
// }

// export default HomePage;

export default function PaginaInicial() {
  // const username = 'freddcf';
  const [username, setUsername] = useState('');
  const user = username.length > 2 ? username : '';
  const [name, setName] = useState('');
  const [counter, setCounter] = useState(0);
  const root = useRouter();

  let timer = null; // variavel para armazenar nosso timer

  useEffect(() => {
    user ? fetch(`https://api.github.com/users/${user}`)
      .then(response => response.json())
      .then(data => setName(data.name)) : setName('');
  }, [counter]);

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: {xs:`url(${backgroundTelaInicialSmall.src})`, lg:`url(${backgroundTelaInicial.src})`}, backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: {xs: '350px' ,sm:'100%'}, 
            maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (event) {
              event.preventDefault();
              if(name){
                root.push(`/chat?username=${username}`);
              } else {
                root.push(`/`);
              }
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: { xs: '250px', sm: '50%' }, textAlign: 'center',
              marginBottom: '30px'
            }}
          >
            <Title tag="h2">Boas vindas de volta!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
              placeholder='Insira o seu GitHub user'
              value={username}
              onInput={function handler(event) {
                const valor = event.target.value;
                setUsername(valor);
                // limpamos o timer
                clearTimeout(timer);
                // armazenamos o timer novamente
                timer = setTimeout(function () {
                  setCounter(counter + 1)
                }, 2000);
              }}
              autoComplete='off'
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
              disabled={user ? false : true}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={name ? `https://github.com/${user}.png` : defaultImage.src}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px',
                textAlign: 'center',
              }}
            >
              {!user ? '. . .' : name ? name : user}
            </Text>
          </Box>

          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}