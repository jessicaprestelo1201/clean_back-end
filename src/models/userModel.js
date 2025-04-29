import prisma from "../../prisma/client.js";

const userModel = {
  // Criar um novo usuário
  async createUser(data) {
    return await prisma.user.create({ data });
  },

  // Buscar todos os usuários
  async findAllUsers() {
    return await prisma.user.findMany();
  },

  // Buscar um usuário pelo email
  async findUserByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
  },

  // Buscar um usuário pelo ID
  async findUserById(id) {
    return await prisma.user.findUnique({ where: { id } });
  },

  // Atualizar informações de um usuário
  async updateUser(id, data) {
    return await prisma.user.update({ where: { id }, data });
  },

  // Excluir um usuário
  async deleteUser(id) {
    return await prisma.user.delete({ where: { id } });
  },
};

export default userModel;