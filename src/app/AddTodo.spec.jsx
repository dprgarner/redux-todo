import {mount} from 'enzyme';
import sinon from 'sinon';

import {AddTodo} from './AddTodo';
import {addTodo} from './actions'

describe('AddTodo', function () {
  beforeEach(function () {
    this.spy = sinon.spy();
    this.addTodo = mount(
      <AddTodo dispatch={this.spy} />
    );
    this.input = this.addTodo.find('input[type="text"]').get(0);
    this.button = this.addTodo.find('button').get(0);
  });

  it('dispatches an addTodo action when text is entered', function () {
    expect(this.spy.called).to.be.false;

    this.input.value = 'Asdf';
    this.button.click();

    expect(this.spy.called).to.be.true;
    expect(this.spy.lastCall.args[0]).to.deep.equal(addTodo('Asdf'));
  });

  it('does not dispatch an action when no text is entered', function () {
    expect(this.spy.called).to.be.false;

    this.input.value = '';
    this.button.click();

    expect(this.spy.called).to.be.false;
  });

  it('clears the input text box on dispatch', function () {
    this.input.value = 'Asdf';
    this.button.click();

    expect(this.input.value).to.equal('');
  });

  it('does not submit whitespace', function () {
    this.input.value = '      ';
    this.button.click();

    expect(this.spy.called).to.be.false;
  });
});