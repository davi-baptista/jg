"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inMemoryUsersRepository = void 0;
class inMemoryUsersRepository {
    items = [];
    async findByEmail(email) {
        return this.items.find(item => item.email === email) ?? null;
    }
    async create(user) {
        this.items.push(user);
    }
}
exports.inMemoryUsersRepository = inMemoryUsersRepository;
//# sourceMappingURL=in-memory-users-repository.js.map