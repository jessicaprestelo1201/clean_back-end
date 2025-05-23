import prisma from "../prisma/prisma.js";
import bcrypt from "bcrypt";

const produtos = [
  // === SKINCARE ===
  {
    nome: "Sabonete Facial Antiacne Esfoliante",
    descricao:
      "Sabonete esfoliante com ácido salicílico e melaleuca, ideal para peles acneicas.",
    preco: 28.07,
    categoria: "Skincare",
    cor: "#A8DADC",
    linkMarca: "https://labotrat.com.br/",
    categoriaMarca: "Labotrat",
    imagem:
      "https://labotrat.com.br/wp-content/uploads/2021/05/sabonete-facial-antiacne.jpg",
  },
  {
    nome: "Água Micelar Labotrat",
    descricao:
      "Água micelar 5 em 1 que limpa, demaquila, purifica, suaviza e refresca a pele.",
    preco: 25.0,
    categoria: "Skincare",
    cor: "#B3D9FF",
    linkMarca: "https://labotrat.com.br/",
    categoriaMarca: "Labotrat",
    imagem:
      "https://labotrat.com.br/wp-content/uploads/2021/05/agua-micelar.jpg",
  },
  {
    nome: "Sérum Vitamina C Natura",
    descricao:
      "Sérum antioxidante com vitamina C pura e ácido hialurônico para iluminar e uniformizar a pele.",
    preco: 99.9,
    categoria: "Skincare",
    cor: "#FFCC99",
    linkMarca: "https://www.natura.com.br/",
    categoriaMarca: "Natura",
    imagem:
      "https://www.natura.com.br/static/arquivos/ids/164414-800-auto?v=637539014700000000&width=800&height=auto&aspect=true",
  },
  {
    nome: "Chronos Protetor Solar FPS 70 Natura",
    descricao: "Protetor solar com toque seco, ação antissinais e clareadora.",
    preco: 81.2,
    categoria: "Skincare",
    cor: "#F5E0C3",
    linkMarca: "https://www.natura.com.br/",
    categoriaMarca: "Natura",
    imagem:
      "https://www.natura.com.br/static/arquivos/ids/164414-800-auto?v=637539014700000000&width=800&height=auto&aspect=true",
  },
  {
    nome: "Gel de Limpeza Facial Avon Clearskin",
    descricao:
      "Gel facial que limpa profundamente e ajuda a controlar a oleosidade.",
    preco: 29.99,
    categoria: "Skincare",
    cor: "#99CCFF",
    linkMarca: "https://www.avon.com.br/",
    categoriaMarca: "Avon",
    imagem:
      "https://www.avon.com.br/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/g/e/gel-de-limpeza-facial.jpg",
  },
  {
    nome: "Creme Facial Antissinais Avon",
    descricao:
      "Creme facial nutritivo com colágeno e elastina para redução de linhas finas.",
    preco: 16.49,
    categoria: "Skincare",
    cor: "#EED9C4",
    linkMarca: "https://www.avon.com.br/",
    categoriaMarca: "Avon",
    imagem:
      "https://www.avon.com.br/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/c/r/creme-facial-antissinais.jpg",
  },
  {
    nome: "Máscara Facial Detox Labotrat",
    descricao:
      "Máscara facial com argila verde e carvão ativado que purifica e revitaliza a pele.",
    preco: 35.0,
    categoria: "Skincare",
    cor: "#D9D9D9",
    linkMarca: "https://labotrat.com.br/",
    categoriaMarca: "Labotrat",
    imagem:
      "https://labotrat.com.br/wp-content/uploads/2021/05/mascara-facial-detox.jpg",
  },
  {
    nome: "Tônico Facial Revitalizante Natura",
    descricao:
      "Tônico facial que reequilibra o pH e prepara a pele para hidratação.",
    preco: 49.9,
    categoria: "Skincare",
    cor: "#FFE680",
    linkMarca: "https://www.natura.com.br/",
    categoriaMarca: "Natura",
    imagem:
      "https://www.natura.com.br/static/arquivos/ids/164414-800-auto?v=637539014700000000&width=800&height=auto&aspect=true",
  },
  {
    nome: "Creme Área dos Olhos Avon Anew",
    descricao:
      "Creme para a área dos olhos com ação antissinais e redução de olheiras.",
    preco: 59.9,
    categoria: "Skincare",
    cor: "#CCCCFF",
    linkMarca: "https://www.avon.com.br/",
    categoriaMarca: "Avon",
    imagem:
      "https://www.avon.com.br/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/c/r/creme-area-dos-olhos.jpg",
  },
  {
    nome: "Eudora Instance Macaron de Framboesa Hidratante",
    descricao:
      "Hidratante corporal com fragrância de macaron e framboesa, toque aveludado.",
    preco: 30.57,
    categoria: "Skincare",
    cor: "#FFC0CB",
    linkMarca: "https://www.eudora.com.br/",
    categoriaMarca: "Eudora",
    imagem:
      "https://www.eudora.com.br/medias/sys_master/images/images/h4f/h7d/9000000000000.jpg",
  },

  // === MAKE ===
  {
    nome: "Batom Velvet Kiko Milano",
    descricao: "Batom matte aveludado com alta pigmentação e longa duração.",
    preco: 59.9,
    categoria: "Make",
    cor: "#D62839",
    linkMarca: "https://www.kikocosmetics.com/",
    categoriaMarca: "Kiko Milano",
    imagem:
      "https://www.kikocosmetics.com/dw/image/v2/BDBD_PRD/on/demandware.static/-/Sites-kiko-master-catalog/default/dw6b061b58/images/zoom/0000000000000.jpg",
  },
  {
    nome: "Máscara de Cílios Super Shock Avon",
    descricao: "Máscara que aumenta o volume dos cílios em até 15x.",
    preco: 35.9,
    categoria: "Make",
    cor: "#000000",
    linkMarca: "https://www.avon.com.br/",
    categoriaMarca: "Avon",
    imagem:
      "https://www.avon.com.br/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/m/a/mascara-super-shock.jpg",
  },
  {
    nome: "Base Fluida Una Natura",
    descricao: "Base líquida com efeito matte e longa duração.",
    preco: 95.9,
    categoria: "Make",
    cor: "#DEB887",
    linkMarca: "https://www.natura.com.br/",
    categoriaMarca: "Natura",
    imagem:
      "https://www.natura.com.br/static/arquivos/ids/164394-800-auto?v=637538981700000000&width=800&height=auto&aspect=true",
  },
  {
    nome: "Lápis de Olho Kiko Milano",
    descricao: "Lápis de olhos à prova d'água com textura macia.",
    preco: 42.0,
    categoria: "Make",
    cor: "#000000",
    linkMarca: "https://www.kikocosmetics.com/",
    categoriaMarca: "Kiko Milano",
    imagem:
      "https://www.kikocosmetics.com/dw/image/v2/BDBD_PRD/on/demandware.static/-/Sites-kiko-master-catalog/default/dwc1bb98d9/images/zoom/0000000000000.jpg",
  },
  {
    nome: "Paleta de Sombras Mark Avon",
    descricao:
      "Paleta de sombras com 8 cores intensas e acabamento matte/metálico.",
    preco: 69.9,
    categoria: "Make",
    cor: "#A0522D",
    linkMarca: "https://www.avon.com.br/",
    categoriaMarca: "Avon",
    imagem:
      "https://www.avon.com.br/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/p/a/paleta-sombras.jpg",
  },
  {
    nome: "Blush Compacto Natura Una",
    descricao: "Blush compacto com efeito natural e luminoso.",
    preco: 62.0,
    categoria: "Make",
    cor: "#F4A460",
    linkMarca: "https://www.natura.com.br/",
    categoriaMarca: "Natura",
    imagem:
      "https://www.natura.com.br/static/arquivos/ids/164394-800-auto?v=637538981700000000&width=800&height=auto&aspect=true",
  },
  {
    nome: "Delineador Líquido Kiko Milano",
    descricao: "Delineador líquido de alta precisão e longa duração.",
    preco: 59.0,
    categoria: "Make",
    cor: "#000000",
    linkMarca: "https://www.kikocosmetics.com/",
    categoriaMarca: "Kiko Milano",
    imagem:
      "https://www.kikocosmetics.com/dw/image/v2/BDBD_PRD/on/demandware.static/-/Sites-kiko-master-catalog/default/dwf12fbe04/images/zoom/0000000000000.jpg",
  },
  {
    nome: "Batom Líquido Matte Eudora",
    descricao:
      "Batom líquido matte com alta pigmentação e textura confortável.",
    preco: 34.9,
    categoria: "Make",
    cor: "#C2185B",
    linkMarca: "https://www.eudora.com.br/",
    categoriaMarca: "Eudora",
    imagem:
      "https://www.eudora.com.br/medias/sys_master/images/images/h48/hcc/9000000000000.jpg",
  },
  {
    nome: "Pó Compacto Eudora",
    descricao: "Pó compacto com acabamento aveludado e controle de brilho.",
    preco: 56.9,
    categoria: "Make",
    cor: "#FFDAB9",
    linkMarca: "https://www.eudora.com.br/",
    categoriaMarca: "Eudora",
    imagem:
      "https://www.eudora.com.br/medias/sys_master/images/images/h3a/hf4/9000000000000.jpg",
  },
  {
    nome: "Iluminador Facial Glow Kiko Milano",
    descricao: "Iluminador facial com efeito glow radiante.",
    preco: 75.0,
    categoria: "Make",
    cor: "#FFF5EE",
    linkMarca: "https://www.kikocosmetics.com/",
    categoriaMarca: "Kiko Milano",
    imagem:
      "https://www.kikocosmetics.com/dw/image/v2/BDBD_PRD/on/demandware.static/-/Sites-kiko-master-catalog/default/dw17222c07/images/zoom/0000000000000.jpg",
  },

  // === BODY ===
  {
    nome: "Creme Hidratante Natura Tododia Macadâmia",
    descricao:
      "Creme nutritivo para o corpo com fragrância suave de macadâmia.",
    preco: 54.9,
    categoria: "Body",
    cor: "#FFEBCD",
    linkMarca: "https://www.natura.com.br/",
    categoriaMarca: "Natura",
    imagem:
      "https://www.natura.com.br/static/arquivos/ids/164404-800-auto?v=637538990300000000&width=800&height=auto&aspect=true",
  },
  {
    nome: "Body Splash Eudora Instance Amora Silvestre",
    descricao:
      "Body splash refrescante com fragrância de amora e flor de hibisco.",
    preco: 39.9,
    categoria: "Body",
    cor: "#C71585",
    linkMarca: "https://www.eudora.com.br/",
    categoriaMarca: "Eudora",
    imagem:
      "https://www.eudora.com.br/medias/sys_master/images/images/h9d/h7e/9000000000000.jpg",
  },
  {
    nome: "Spray Corporal Natura Ekos Açaí",
    descricao: "Spray perfumado com fragrância frutal vibrante.",
    preco: 59.9,
    categoria: "Body",
    cor: "#9400D3",
    linkMarca: "https://www.natura.com.br/",
    categoriaMarca: "Natura",
    imagem:
      "https://www.natura.com.br/static/arquivos/ids/164404-800-auto?v=637538990300000000&width=800&height=auto&aspect=true",
  },
  {
    nome: "Loção Hidratante Avon Encanto Irresistível",
    descricao: "Loção hidratante com fragrância floral e toque macio.",
    preco: 29.9,
    categoria: "Body",
    cor: "#F8BBD0",
    linkMarca: "https://www.avon.com.br/",
    categoriaMarca: "Avon",
    imagem:
      "https://www.avon.com.br/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/l/o/locao-encanto.jpg",
  },
  {
    nome: "Creme de Mãos Eudora Instance Baunilha",
    descricao: "Hidratante para mãos com fragrância doce e textura leve.",
    preco: 22.9,
    categoria: "Body",
    cor: "#FFE4B5",
    linkMarca: "https://www.eudora.com.br/",
    categoriaMarca: "Eudora",
    imagem:
      "https://www.eudora.com.br/medias/sys_master/images/images/h43/h13/9000000000000.jpg",
  },
  {
    nome: "Desodorante Colônia Natura Ekos Maracujá",
    descricao: "Colônia fresca com notas frutais de maracujá.",
    preco: 79.9,
    categoria: "Body",
    cor: "#FFD700",
    linkMarca: "https://www.natura.com.br/",
    categoriaMarca: "Natura",
    imagem:
      "https://www.natura.com.br/static/arquivos/ids/164404-800-auto?v=637538990300000000&width=800&height=auto&aspect=true",
  },
  {
    nome: "Óleo Corporal Natura Sève Amêndoas Doces",
    descricao: "Óleo corporal hidratante com toque aveludado.",
    preco: 64.9,
    categoria: "Body",
    cor: "#D2691E",
    linkMarca: "https://www.natura.com.br/",
    categoriaMarca: "Natura",
    imagem:
      "https://www.natura.com.br/static/arquivos/ids/164404-800-auto?v=637538990300000000&width=800&height=auto&aspect=true",
  },
  {
    nome: "Sabonete Líquido Avon Encanto Delicadeza",
    descricao:
      "Sabonete líquido perfumado para o corpo com fragrância delicada.",
    preco: 19.9,
    categoria: "Body",
    cor: "#FFB6C1",
    linkMarca: "https://www.avon.com.br/",
    categoriaMarca: "Avon",
    imagem:
      "https://www.avon.com.br/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/s/a/sabonete-encanto.jpg",
  },
  {
    nome: "Body Splash Eudora La Piel",
    descricao: "Body splash com fragrância envolvente e toque sofisticado.",
    preco: 49.9,
    categoria: "Body",
    cor: "#FF69B4",
    linkMarca: "https://www.eudora.com.br/",
    categoriaMarca: "Eudora",
    imagem:
      "https://www.eudora.com.br/medias/sys_master/images/images/h84/h29/9000000000000.jpg",
  },
  {
    nome: "Loção Hidratante Natura Tododia Ameixa e Flor de Baunilha",
    descricao:
      "Loção com nutrição prebiótica, textura cremosa e rápida absorção.",
    preco: 57.9,
    categoria: "Body",
    cor: "#FF69B4",
    linkMarca: "https://www.natura.com.br/",
    categoriaMarca: "Natura",
    imagem:
      "https://www.natura.com.br/static/arquivos/ids/164404-800-auto?v=637538990300000000&width=800&height=auto&aspect=true",
  },
];

const usuarios = [
  {
    nome: "Gabriela Moleta",
    email: "gabriela.moleta@aluno.senai.br",
    senha: await bcrypt.hash("GabiMoleta*", 10),
  },
  {
    nome: "Nicole Cau",
    email: "nicole.cau@aluno.senai.br",
    senha: await bcrypt.hash("Niccau*", 10),
  },
  {
    nome: "Jessica Prestelo",
    email: "jessica.p.jesus@aluno.senai.br",
    senha: await bcrypt.hash("JesicaPrestelo*", 10),
  },
  {
    nome: "Nathalia Santos Ferreira",
    email: "nathalia.s.ferreira9@aluno.senai.br",
    senha: await bcrypt.hash("NathSanfer#", 10),
  },
  {
    nome: "Fernanda Louro",
    email: "fernanda.louro@aluno.senai.br",
    senha: await bcrypt.hash("EUnaocomotom@ate", 10),
  },
  {
    nome: "Samuel Braga",
    email: "samuel.d.braga6@gmail.com",
    senha: await bcrypt.hash("nemTyConto45@", 10),
  },
];

const avaliacoes = [
  {
    estrelas: 5,
    comentario: "Ótimo site, muito fácil de usar!",
    avaliacaoSite: true,
    nomeUsuario: "Gabriela Moleta",
    fotoUsuario: "https://via.placeholder.com/80",
  },
  {
    estrelas: 4,
    comentario: "Gostei bastante, mas poderia ser mais rápido.",
    avaliacaoSite: true,
    nomeUsuario: "Nicole Cau",
    fotoUsuario: "https://via.placeholder.com/80",
  },
  {
    estrelas: 5,
    comentario: "Excelente experiência de compra!",
    avaliacaoSite: true,
    nomeUsuario: "Jessica Prestelo",
    fotoUsuario: "https://via.placeholder.com/80",
  },
  {
    estrelas: 3,
    comentario: "O site é bom, mas tive problemas para finalizar a compra.",
    avaliacaoSite: true,
    nomeUsuario: "Nathalia Santos Ferreira",
    fotoUsuario: "https://via.placeholder.com/80",
  },
  {
    estrelas: 4,
    comentario: "Gostei do layout, mas o suporte demorou para responder.",
    avaliacaoSite: true,
    nomeUsuario: "Fernanda Louro",
    fotoUsuario: "https://via.placeholder.com/80",
  },
  {
    estrelas: 5,
    comentario: "Muito prático e rápido, recomendo!",
    avaliacaoSite: true,
    nomeUsuario: "Samuel Braga",
    fotoUsuario: "https://via.placeholder.com/80",
  },
  {
    estrelas: 2,
    comentario: "Não gostei muito, o site travou várias vezes.",
    avaliacaoSite: true,
    nomeUsuario: "Gabriela Moleta",
    fotoUsuario: "https://via.placeholder.com/80",
  },
  {
    estrelas: 4,
    comentario: "Bom site, mas poderia ter mais opções de pagamento.",
    avaliacaoSite: true,
    nomeUsuario: "Nicole Cau",
    fotoUsuario: "https://via.placeholder.com/80",
  },
  {
    estrelas: 5,
    comentario: "Adorei, muito fácil de navegar!",
    avaliacaoSite: true,
    nomeUsuario: "Jessica Prestelo",
    fotoUsuario: "https://via.placeholder.com/80",
  },
  {
    estrelas: 3,
    comentario: "Site razoável, mas precisa de melhorias.",
    avaliacaoSite: true,
    nomeUsuario: "Nathalia Santos Ferreira",
    fotoUsuario: "https://via.placeholder.com/80",
  },
];

async function main() {
  // Limpar tabelas dependentes antes de limpar os produtos e usuários
  await prisma.avaliacao.deleteMany(); // Limpa as avaliações
  await prisma.comment?.deleteMany(); // Limpa os comentários (se existir)
  await prisma.like?.deleteMany(); // Limpa as curtidas (se existir)
  await prisma.product.deleteMany(); // Limpa os produtos
  await prisma.user.deleteMany(); // Limpa os usuários

  console.log("Banco de dados limpo!");

  // Criar produtos
  for (const produto of produtos) {
    await prisma.product.create({
      data: produto,
    });
  }

  // Criar usuários
  for (const usuario of usuarios) {
    await prisma.user.create({
      data: usuario,
    });
  }

  // Criar avaliações
  for (const avaliacao of avaliacoes) {
    await prisma.avaliacao.create({
      data: avaliacao,
    });
  }

  console.log("Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
