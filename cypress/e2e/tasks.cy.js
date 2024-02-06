/// <reference types="cypress" />

describe('tarefas', () => {

    let testData;

    before(()=>{
        cy.fixture('tasks').then(t => {
            testData = t
        })
        
    })



    context('Cadastro', () => {
        it('Deve cadastrar uma nova tarefa', () => {
            const taskName = 'Ler um livro de node.js'
            cy.removeTaskByName(taskName)
            cy.createTask(taskName)
            cy.contains('main div p', taskName)
                .should('be.visible')
        })

        it('não deve permitir tarefa duplicada', () => {
            const task = testData.dup

            cy.removeTaskByName(task.name)
            cy.postTask(task)
            cy.createTask(task.name)
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
        })
        it('campo obrigaório', () => {
            cy.createTask()
            cy.isRequired('This is a required field')
        })
    })
    context('Atualização', () => {
        it('Deve concluir uma tarefa', () => {
            const task = {
                name: 'Pagar contas de consumo',
                is_done: false
            }
            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')
            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })
    })
    context('exclusão', () => {
        it('Deve remover uma tarefa', () => {
            const task = {
                name: 'Estudar JavaScript',
                is_done: false
            }
            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')
            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')
        })
    })
})