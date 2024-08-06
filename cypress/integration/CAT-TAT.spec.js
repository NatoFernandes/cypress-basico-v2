///<reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(function () {
        cy.visit('./src/index.html')
    });

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName')
            .should('be.visible')
            .type('Raimundo')
            .should('have.value', 'Raimundo')
        cy.get('#lastName')
            .should('be.visible')
            .type('Nonato')
            .should('have.value', 'Nonato')
        cy.get('#email')
            .should('be.visible')
            .type('raimundo.nonato@sharklasers.com')
            .should('have.value', 'raimundo.nonato@sharklasers.com')
        cy.get('#open-text-area')
            .should('be.visible')
            .type('Preciso de ajuda, por favor!!!')
            .should('have.value', 'Preciso de ajuda, por favor!!!')
        cy.get('[type="submit"]')
            .should('have.text', 'Enviar')
            .click()
        cy.get('.success')
            .should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {

        const longText = Cypress._.repeat('Preciso de ajuda, por favor!!!', 50)
        //const text = 'Preciso de ajuda, por favor!!! Preciso de ajuda, por favor!!! Preciso de ajuda, por favor!!! Preciso de ajuda, por favor!!!'

        cy.get('#firstName')
            .should('be.visible')
            .type('Jackson')
            .should('have.value', 'Jackson')
        cy.get('#lastName')
            .should('be.visible')
            .type('Lemos')
            .should('have.value', 'Lemos')
        cy.get('#email')
            .should('be.visible')
            .type('jackson.lemos')
            .should('have.value', 'jackson.lemos')
        cy.get('#open-text-area')
            .should('be.visible')
            .type(longText, { delay: 0 })
            //.should('have.value', text)
            .invoke('val', longText)
        cy.get('[type="submit"]')
            .should('have.text', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    })

    it('validar que o campo de telefone não aceita o preenchimento com letras', function () {
        cy.get('#phone')
            .should('have.value', '')
            .type('teste teste teste @#$%¨&)(!@^`~:?!')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName')
            .should('be.visible')
            .type('Jorge')
            .should('have.value', 'Jorge')
        cy.get('#lastName')
            .should('be.visible')
            .type('Amaro')
            .should('have.value', 'Amaro')
        cy.get('#email')
            .should('be.visible')
            .type('jorge.amaro@sharklasers.com')
            .should('have.value', 'jorge.amaro@sharklasers.com')
        cy.get('#open-text-area')
            .should('be.visible')
            .type('Preciso de ajuda, por favor!!!')
            .should('have.value', 'Preciso de ajuda, por favor!!!')
        cy.get('#phone-checkbox')
            .check()
        cy.get('[type="submit"]')
            .should('have.text', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .should('be.visible')
            .should('have.value', '')
            .type('Raimundo')
            .should('have.value', 'Raimundo')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .should('be.visible')
            .should('have.value', '')
            .type('Nonato')
            .should('have.value', 'Nonato')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .should('be.visible')
            .should('have.value', '')
            .type('raimundo.nonato@sharklasers.com')
            .should('have.value', 'raimundo.nonato@sharklasers.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .should('be.visible')
            .should('have.value', '')
            .type('11999334455')
            .should('have.value', '11999334455')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios e validar que a mensagem de erro esteja visível por 3 segundos', function () {
        cy.visit('./src/index.html')
        cy.clock()
        cy.get('[type="submit"]')
            .should('have.text', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
        cy.tick(3000)
        cy.get('.error')
            .should('not.be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.envioFormularioSucesso('Régis', 'Danese', 'regis@sharklasers.com', 'Boa tarde!')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('[value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('#email-checkbox').should('not.be.checked')
        cy.get('#phone-checkbox').should('not.be.checked')
        cy.get('[type="checkbox"]')
            .as('checkboxes')
            .check()
        cy.get('#email-checkbox').should('be.checked')
        cy.get('#phone-checkbox').should('be.checked')
        cy.get('[type="checkbox"]')
            .last()
            .uncheck()
        cy.get('#email-checkbox').should('be.checked')
        cy.get('#phone-checkbox').should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/brasil.jpg')
            /* .then(input => {
                expect(input[0].files[0].name).to.equal('brasil.jpg')
            }) */
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('brasil.jpg')
            })
    })

    //Drag-and-Drop simula como se o usuário estivesse arrastando o arquivo para a página
    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/brasil.jpg', { action: 'drag-drop' })
            /* .then(input => {
                expect(input[0].files[0].name).to.equal('brasil.jpg')
            }) */
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('brasil.jpg')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('brasil.jpg').as('exampleFile')
        cy.get('#file-upload')
            .selectFile('@exampleFile')
            .then(input => {
                expect(input[0].files[0].name).to.equal('brasil.jpg')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy > a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy > a')
            //Verificar se tem o atributo "target" que faz o link abrir em outra página
            .should('have.attr', 'target', '_blank')
            //Remover o atributo tarket para que ao clicar abra na mesma página ( deve estar no mesmo domínio (ou sub-domínio)) para fazer a validação
            .invoke('removeAttr', 'target')
            .click()
        cy.get('div > h1').should('have.text', 'CAC TAT - Política de privacidade')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function () {
        cy.get('[type="submit"]')
        cy.get('.error')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')

    })

    it('preenche a area de texto usando o comando invoke', function () {
        const text = 'Teste Teste Teste'

        cy.get('#open-text-area')
            .invoke('val', text)
            .should('have.value', text)
    })

    it('faz uma requisição HTTP', function () {
        cy.request({
            method: 'GET',
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        }).then((response) => {
            /* expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
            expect(response.body).include('CAC TAT') */
            const { status, statusText, body } = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).include('CAC TAT')

        })
    })

    it.only('encontre o gato', function () {
        cy.get('#cat')
            .should('not.be.visible')
            .invoke('show')
            .and('be.visible')

        //Alterar o título da página
        cy.get('#title')
            .invoke('text', 'Eu encontrei o gato!!!')

        //Retirando o paragrafo
        cy.get('#subtitle')
            .invoke('text', '')
    })
})