describe('サインイン', () => {
  it('を行う', () => {
    // サインインページへ移動
    cy.visit('/signin');

    // メールアドレスとパスワードを入力
    cy.fixture('user').then((user) => {
      cy.get('[data-cy=input-email]').type(user.email);
      cy.get('[data-cy=input-password]').type(user.password);
    });

    // サインインボタンをクリック
    cy.get('button').click();

    // サインイン後のページへのリダイレクトを確認
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
