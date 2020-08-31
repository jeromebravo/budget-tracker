import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {getTransactions} from '../../actions/transaction';
import IncomeItem from '../transaction/IncomeItem';
import ExpenseItem from '../transaction/ExpenseItem';
import calculateTotal from '../../utils/calculateTotal';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCoins} from '@fortawesome/free-solid-svg-icons';

const Homepage = ({auth: {isAuthenticated, loading}, getTransactions, transaction}) => {
    useState(() => {
        getTransactions();
    }, []);

    const recentIncome = transaction.income.map(val => <IncomeItem key={val._id} {...val} />);
    const recentExpense = transaction.expense.map(val => <ExpenseItem key={val._id} {...val} />);

    const totalIncome = calculateTotal(transaction.income);
    const totalExpense = calculateTotal(transaction.expense);
    const remainingBalance = totalIncome - totalExpense;

    return (
        !loading &&
        <div>
            {
                isAuthenticated ? 
                    !transaction.loading && (
                        <div className='homepage'>
                            <div className='balance'>
                                <div className='balance-box'>
                                    <h2>BALANCE:</h2>
                                    <p className='total'><FontAwesomeIcon icon={faCoins} /> {remainingBalance.toLocaleString()}</p>
                                </div>
                            </div>
                            
                            <div className='transaction'>
                                <div className='income'>
                                    <div className='income-box'>
                                        <h2>INCOME:</h2>
                                        <p className='total'><FontAwesomeIcon icon={faCoins} /> {totalIncome.toLocaleString()}</p>
                                    </div>
                                    {recentIncome}
                                </div>

                                <div className='expense'>
                                    <div className='expense-box'>
                                        <h2>EXPENSE:</h2>
                                        <p className='total'><FontAwesomeIcon icon={faCoins} /> {totalExpense.toLocaleString()}</p>
                                    </div>
                                    {recentExpense}
                                </div>
                            </div>
                        </div>
                    )
                
                : <Redirect to='/login' />
            }
        </div>
    );
}

Homepage.propTypes = {
    auth: PropTypes.object.isRequired,
    getTransactions: PropTypes.func.isRequired,
    transaction: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    transaction: state.transaction
});

export default connect(mapStateToProps, {getTransactions})(Homepage);