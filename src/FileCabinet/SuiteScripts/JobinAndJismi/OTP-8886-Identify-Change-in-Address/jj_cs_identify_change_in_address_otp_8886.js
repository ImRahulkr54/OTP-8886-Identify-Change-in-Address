/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

/******************************************************************************* 
 ********* 
 * 
 * OTP-8886 : Identify Change in Address
 * 
 *******************************************************************************
 **********
 *
 * Author : Jobin and Jismi IT Services
 * 
 * Date Created : 30-May-2025
 * 
 * Description : This script is designed to Create a custom checkbox in Customer record,
 *               which will be checked when there is a change in existing address or adding
 *               a new address & will be unchecked when any other field value is changed.
 * 
 * REVISION HISTORY
 * 
 * @version 1.0 30-May-2025 : Created the initial build by JJ0400
*/

define(['N/log'],
    /**
     * @param{log} log
     */
    function (log) {



        /**
         * Function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @since 2015.2
         */

        let flag = 0;

        function fieldChanged(scriptContext) {

            if (scriptContext.fieldId !== 'custentity_jj_check_address') {

                addressChange(scriptContext);

            }


            function addressChange(scriptContext) {

                try {

                    const newRec = scriptContext.currentRecord;

                    if (scriptContext.fieldId === 'defaultaddress') {

                        newRec.setValue({ fieldId: 'custentity_jj_check_address', value: true });

                        flag = 1;

                    }

                    else {

                        if (flag === 1) {

                            newRec.setValue({ fieldId: 'custentity_jj_check_address', value: true });

                        }

                        else {

                            newRec.setValue({ fieldId: 'custentity_jj_check_address', value: false });

                        }

                    }


                } catch (e) {

                    log.error('error', e.message);

                }

            }

        }


        return {
            fieldChanged: fieldChanged
        };

    });
