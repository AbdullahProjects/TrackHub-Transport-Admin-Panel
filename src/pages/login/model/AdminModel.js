class AdminModel {
  constructor({ id, email, organizationId, role }) {
    this.id = id;
    this.email = email;
    this.organizationId = organizationId;
    this.role = role;
  }
}

const adminModelFirestoreConvertor = {
  toFirestore: (adminModel) => {
    return {
      id: adminModel.id,
      email: adminModel.email,

      organizationId: adminModel.organizationId,
      role: adminModel.role,
    };
  },
  fromFirestore: (data) => {
    return new AdminModel({
      id: data.id,
      email: data.email,
      organizationId: data.organizationId,
      role: data.role,
    });
  },
};

export {AdminModel, adminModelFirestoreConvertor};
