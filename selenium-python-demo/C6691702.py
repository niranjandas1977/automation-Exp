'''
Test Suite = http://lnxtestrail.ibi.com/testrail//index.php?/suites/view/20072&group_by=cases:section_id&group_id=514336&group_order=asc
Test Case = http://lnxtestrail.ibi.com/testrail//index.php?/cases/view/6691702
TestCase Name = Percent, Negative Bracket
'''

import unittest, time
from common.lib.basetestcase import BaseTestCase
from common.wfcomponent import dataformatdialog

class C6691702_TestClass(BaseTestCase):

    def test_C6691702(self):
        
        """
        TESTCASE Object's
        """
        data_formobj = dataformatdialog.DataFormatDialog(self.driver)
        numeric_formobj = dataformatdialog.NumericType(self.driver)
        
        """ step 1: Login as a WebFOCUS Basic User
            Launch http://machine:port/{alias}/junit/dataformatTesterDlgOnly.jsp?
        """
        data_formobj.invoke_dataformattesterdlgonly_jsp()
        
        """ Step 2: Enter D12.2% into Format to parse (input) and click Show data format
        """
        data_formobj.set_text_to_format_to_parse_input_box('D12.2%')
        data_formobj.click_show_data_format_button()
        data_formobj.verify_data_format_dialog_is_visible('2')
        data_formobj.verify_selected_datatype('numeric', '2.1')
        numeric_formobj.verify_selected_numeric_datatype('percentage', '2.2')
        numeric_formobj.verify_max_length('12', '2.3')
        numeric_formobj.verify_decimal_place('2', '2.4')
        numeric_formobj.verify_negative_numbers('2.5', expected_selected_value='-123')
        numeric_formobj.verify_checkbox_inside_numeric__dataformat_dialog('Show 1000 separator', False, '2.6')
        numeric_formobj.verify_checkbox_inside_numeric__dataformat_dialog('Show leading zero', False, '2.7')
        
        """ Step 3: Select the negative bracket box (123) under Negative number
        """
        numeric_formobj.select_negative_numbers('(123)')
        
        """ Step 4: click ok
        """        
        data_formobj.close_data_format_dialog_using_ok_button()
        data_formobj.verify_output_format_value('D12.2B%', '4')
        
        """ Step 5: Replace D12.2% with D12.2B% into Format to parse (input) and click Show data format
        """
        data_formobj.set_text_to_format_to_parse_input_box('D12.2B%')
        data_formobj.click_show_data_format_button()
        data_formobj.verify_data_format_dialog_is_visible('5')
        data_formobj.verify_selected_datatype('numeric', '5.1')
        numeric_formobj.verify_selected_numeric_datatype('percentage', '5.2')
        numeric_formobj.verify_max_length('12', '5.3')
        numeric_formobj.verify_decimal_place('2', '5.4')
        numeric_formobj.verify_negative_numbers('5.5', expected_selected_value='(123)')
        numeric_formobj.verify_checkbox_inside_numeric__dataformat_dialog('Show 1000 separator', False, '5.6')
        numeric_formobj.verify_checkbox_inside_numeric__dataformat_dialog('Show leading zero', False, '5.7')
        time.sleep(3)
        
if __name__ == '__main__':
    unittest.main()