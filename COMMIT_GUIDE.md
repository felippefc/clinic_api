# 📝 Commit Guide

Este projeto segue um padrão de commits simples e semântico para manter o histórico claro, organizado e fácil de entender.

## 🔧 Formato do commit

```
<tipo>: <descrição curta em minúsculas>
```

### ✔️ Exemplos válidos:

```
feat: create patient entity
feat: add doctor registration endpoint
fix: correct patient email validation
docs: update README with setup steps
refactor: simplify appointment controller
chore: add .env.example and .gitignore
```

---

## 📚 Tipos de commit

| Tipo       | Descrição |
|------------|-----------|
| `feat`     | Adição de nova funcionalidade |
| `fix`      | Correção de bugs |
| `docs`     | Alterações em arquivos de documentação |
| `refactor` | Melhorias no código sem alterar comportamento |
| `chore`    | Mudanças de configuração, setup ou dependências |
| `test`     | Criação ou atualização de testes |
| `style`    | Ajustes de formatação, indentação, etc. (sem alteração de lógica) |

---

## 📌 Dicas

- Commits devem ser curtos e claros.
- Faça um commit para cada mudança lógica importante.
- Não inclua mais de uma intenção por commit (ex: não misture refactor + fix).

---

## ✅ Exemplo de fluxo ideal

1. `feat: create appointment entity`
2. `feat: add create appointment endpoint`
3. `fix: prevent overlapping appointments`
4. `docs: document appointment route in README`

---

Seguindo esse padrão, seu código vai parecer mais profissional e será mais fácil de revisar — tanto por você quanto por outras pessoas. 🚀