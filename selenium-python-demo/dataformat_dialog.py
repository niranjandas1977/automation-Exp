import re
from common.lib.base import BasePage
from common.lib.utillity import UtillityMethods as utillobject
from common.lib.core_utility import CoreUtillityMethods as coreutilobj
from selenium.common.exceptions import NoSuchElementException, ElementNotVisibleException
from selenium.webdriver.support.color import Color

class DataFormat_Dialog(BasePage) :
    
    data_format_dialog_css = '.ibx-dialog.ibx-popup'
    datatype_parent_group_css = data_format_dialog_css + ' .wfc-df-datatype-group'
    alpha_length_css=data_format_dialog_css +  ' .wfc-df-alpha-spinner'
    alpha_length_input_textbox_css= alpha_length_css + ' input'
    alpha_dataformat_box_css= alpha_length_css+'.wfc-dataformat-box'
    
    variable_length_label_css = data_format_dialog_css + " [class*='wfc-dataformat-label'][data-ibx-name='cbVariable']"
    show_data_format_css = 'div.format-button'
    format_to_parse_input_box_css = 'div.format-input input'
    format_to_parse_output_box_css = 'div.format-output input'
    date_format_parent_css = "{0} div[data-ibx-name='dateBox']".format(data_format_dialog_css)
    date_format_input_css = "{0} [data-ibx-name='dateFormat'] input".format(date_format_parent_css)
    date_separator_input_css = "{0} [data-ibx-name='dateSeparator'] input".format(date_format_parent_css)
    dropdown_popup_css = '.ibx-select-popup.pop-top'
    dropdown_popup_items_css = dropdown_popup_css + ' .ibx-select-item'
    custom_format_input_css="{0} [data-ibx-name='customFormat'] input".format(data_format_dialog_css)
    
    numeric_format_parent_css = "{0} div[data-ibx-name='numericBox']".format(data_format_dialog_css)
    numeric_format_type_group_css = numeric_format_parent_css + ' .wfc-df-numerictype-group'
    numeric_length_css = numeric_format_parent_css + ' .wfc-df-int-spinner'
    numeric_length_input_textbox_css = numeric_length_css + ' input'
    numeric_dataformat_box_css= numeric_length_css+'.wfc-dataformat-box'
    numeric_decimal_css = numeric_format_parent_css + ' .wfc-df-dec-spinner'
    numeric_decimal_input_textbox_css = numeric_decimal_css + ' input'
    numeric_negative_groupbox_css = numeric_format_parent_css + ' .wfc-df-negative-group'
    numeric_symbol_position_groupbox_css = numeric_format_parent_css + ' .wfc-df-position-group'
    numeric_currency_format_parent_css = data_format_dialog_css + ' .wfc-df-currency-group'
    cb_ibx_label_name={'variable_length':'Variable', 'show_1000_separator':'Thousand', 'show_leading_zero':'Zero'}

            
    def __init__(self, driver):
        '''
        constructor
        '''
        super(DataFormat_Dialog, self).__init__(driver)
    
    def invoke_dataformattesterdlgonly_jsp(self):
        '''
        To invoke dataformatTesterDlgOnly.jsp page, 
        first call Api  http://machine:port/{alias} to login in setup then call "http://machine:port/{alias}/junit/dataformatTesterDlgOnly.jsp?"
        
        :usage invoke_dataformattesterdlgonly_jsp()
        '''
        setup_url = utillobject.get_setup_url(self)
        jsp_file_directory_name = utillobject.parseinitfile(self, 'jsp_file_directory')
        jsp_file_name = utillobject.parseinitfile(self, 'jsp_file_name')
        required_url=setup_url + jsp_file_directory_name + '/' + jsp_file_name + '.jsp?'
        self.driver.get(setup_url)
        utillobject.wf_login(self)
        self.driver.get(required_url)
        utillobject.synchronize_with_number_of_element(self, DataFormat_Dialog.format_to_parse_input_box_css, 1, 290)
        
    def click_show_data_format_button(self):
        '''
        This function will Click on show data format button.
        
        :usage click_show_data_format_button()
        '''
        try:
            show_date_elem=self.driver.find_element_by_css_selector(DataFormat_Dialog.show_data_format_css)
        except NoSuchElementException:
            raise AttributeError("'Click show data format button' not displayed on current page.")
        coreutilobj.left_click(self, show_date_elem)
        utillobject.synchronize_with_number_of_element(self, DataFormat_Dialog.data_format_dialog_css+" .ibx-dialog-ok-button", 1, 30)
        
    def set_text_to_format_to_parse_input_box(self, input_value):
        '''
        This function will type value in format to parse input box.
        
        :usage set_text_to_format_to_parse_input_box('YYMD')
        '''
        try:
            format_to_parse_input_box_elem=self.driver.find_element_by_css_selector(DataFormat_Dialog.format_to_parse_input_box_css)
        except NoSuchElementException:
            raise AttributeError("'Format to parse input' not displayed on current page.")    
        utillobject.set_text_to_textbox_using_keybord(self, input_value, text_box_elem=format_to_parse_input_box_elem)
        utillobject.synchronize_with_visble_text(self, DataFormat_Dialog.format_to_parse_input_box_css, input_value, 90, text_option='text_value')
    
    def get_output_format_value(self):
        '''
        This function will read value from output format input box.
        
        :usage get_output_format_value()
        '''
        try:
            return self.driver.find_element_by_css_selector(DataFormat_Dialog.format_to_parse_output_box_css).get_attribute('value')
        except NoSuchElementException:
            raise AttributeError("'Get output format textbox' not displayed on current page.")
        
    def verify_output_format_value(self, expected_output_value, msg):
        '''
        This function will verify value from output format input box and given from user.
        
        @param expected_output_value:'YYMD'
        @param msg: 'Step 9: Verify output format value.'
        :usage get_output_format_value('YYMD', 'Step 9: Verify output format value.')
        '''
        actual_output_value = DataFormat_Dialog.get_output_format_value(self)
        utillobject.asequal(self, expected_output_value, actual_output_value, msg)
          
    def verify_data_format_dialog_is_visible(self, msg):
        '''
        This function will verify show data format dialog opened and visible.
        
        @param expected_output_value:'YYMD'
        @param msg: 'Step 9: Verify output format value.'
        :usage get_output_format_value('YYMD', 'Step 9: Verify output format value.')
        '''
        data_format_dialog_css = DataFormat_Dialog.data_format_dialog_css
        utillobject.verify_object_visible(self, data_format_dialog_css, True, msg)
        
    def close_data_format_dialog_using_ok_cancel_button(self, button_name):
        '''
        This function will close show data format dialog by click on 'ok' or 'cancel' button.
        
        @param button_name:'ok' or 'cancel'
        :usage close_data_format_dialog_using_ok_cancel_button('ok')
        '''
        close_dialog_css = DataFormat_Dialog.data_format_dialog_css + ' .ibx-dialog-'+button_name.lower()+'-button'
        try:
            close_dialog_elem = self.driver.find_element_by_css_selector(close_dialog_css)
        except NoSuchElementException:
            raise AttributeError("'{0}' not available under Data format dialog.".format(button_name.upper()))
        coreutilobj.left_click(self, close_dialog_elem)
        utillobject.synchronize_until_element_disappear(self, DataFormat_Dialog.data_format_dialog_css, 36)
        
    def verify_datatype_fields(self):
        '''
        This function will verify datatype fields 'alpha', 'numeric', 'date' in list format ex:['Abc', '123', '12/31/2018']
        
        :usage verify_datatype_fields()
        Implementation is In-progress.
        '''
        self.driver.find_element_by_css_selector(DataFormat_Dialog.datatype_parent_group_css).text.split('\n')
        
    def verify_selected_datatype(self, datatype_format, msg, color_name='gray80'):
        '''
        This function will verify selected datatype field is either 'alpha', 'numeric', 'date' or 'custom' and it should be highlighted with gray color.
        
        @param datatype_format:'alpha', 'numeric', 'date' or 'custom'.
        @param msg: 'Step 9: Verify output format value.'
        @param color_name: 'gray80'
        :usage verify_selected_datatype('alpha', 'Step 9: Verify output format value.')
        '''
        step_no = re.search(r'\d+', msg).group()
        selected_datatype_class = 'radio-group-checked'
        if datatype_format not in ['alpha', 'numeric', 'date', 'custom']:
            raise ValueError("Invalid datatype provided. Please provide any of the applicable data type from ['alpha', 'numeric', 'date'].")
        individual_datatype_css = DataFormat_Dialog.datatype_parent_group_css + " [data-ibxp-user-value='{0}']".format(datatype_format)
        data_type_elem = self.driver.find_element_by_css_selector(individual_datatype_css)
        class_detail = data_type_elem.get_attribute('class')
        actual_color_details = Color.from_string(data_type_elem.value_of_css_property('background-color')).rgba
        utillobject.asin(self, selected_datatype_class, class_detail, msg)
        expected_color_details = utillobject.color_picker(self, color_name, rgb_type='rgba')
        output_message="Step {0}.a: Verify if '{1}' data format dialog is highlighted with color '{2}'.".format(step_no, datatype_format, expected_color_details)
        utillobject.asequal(self, expected_color_details, actual_color_details, output_message)
        
    def select_datatype(self, datatype_format):
        '''
        This function will selected datatype field is either 'alpha', 'numeric', 'date' or 'custom'.
        
        @param datatype_format:'alpha', 'numeric', 'date' or 'custom'.
        :usage select_datatype('alpha')
        '''
        if datatype_format not in ['alpha', 'numeric', 'date']:
            raise ValueError("Invalid datatype provided. Please provide any of the applicable data type from ['alpha', 'numeric', 'date'].")
        individual_datatype_css = DataFormat_Dialog.datatype_parent_group_css + " [data-ibxp-user-value='{0}']".format(datatype_format)
        data_type_elem = self.driver.find_element_by_css_selector(individual_datatype_css)
        coreutilobj.left_click(self, data_type_elem)  
    
    def verify_checkbox_in_dataformat_popup(self, label_name, check_uncheck_toggle, step_num):
        '''
        This function will verify either check box is selected or not under data format popup for any one of the section 'alpha', 'numeric', 'date' or 'custom'.
        
        @param label_name:'Variable length'.
        @param check_uncheck_toggle: True or False
        @param step_num:'9'
        :usage verify_checkbox_in_dataformat_popup('Variable length', True, '9')
        '''
        check_uncheck_toggle = 'check' if check_uncheck_toggle == True else 'uncheck'
        any_label_css=DataFormat_Dialog.data_format_dialog_css + " [class*='wfc-dataformat-label'][data-ibx-name='cb{0}']".format(str(DataFormat_Dialog.cb_ibx_label_name[label_name.lower().replace(' ', '_')]))
        checkbox_css=any_label_css + " > .ibx-check-box-simple-marker-{0}".format(check_uncheck_toggle)
        msg = 'Step {0}: Verify whether the {1} check box is {2}ed.'.format(str(step_num), label_name, check_uncheck_toggle)
        utillobject.verify_object_visible(self, checkbox_css, True, msg)
               
    def select_checkbox_in_dataformat_popup(self, label_name, check_uncheck_toggle):
        '''
        This function will select or un_select check box under data format popup for any one of the section 'alpha', 'numeric', 'date' or 'custom'.
        
        @param label_name:'Variable length'.
        @param check_uncheck_toggle: True or False
        :usage select_checkbox_in_dataformat_popup('Variable length', True)
        '''
        check_uncheck_toggle = 'check' if check_uncheck_toggle == True else 'uncheck'
        any_label_css = DataFormat_Dialog.data_format_dialog_css + " [class*='wfc-dataformat-label'][data-ibx-name='cb{0}']".format(str(DataFormat_Dialog.cb_ibx_label_name[label_name.lower().replace(' ', '_')]))
        checkbox_css = any_label_css + " > .ibx-check-box-simple-marker-{0}".format(check_uncheck_toggle)
        try:
            checkbox_elem = self.driver.find_element_by_css_selector(checkbox_css)
        except NoSuchElementException:
            disp_msg = label_name + ' checkbox is already ' + check_uncheck_toggle + ', and you are trying to ' + check_uncheck_toggle + ' again.'
            raise LookupError(disp_msg)
        coreutilobj.left_click(self, checkbox_elem)
              
    '''-----------------------------------------Alpha Type---------------------------------------------------'''    
    def get_length(self):
        '''
        This function will read value from Length input box under alpha section.
        
        :usage get_length()
        '''
        return self.driver.find_element_by_css_selector(DataFormat_Dialog.alpha_length_input_textbox_css).get_attribute('aria-valuenow')
    
    def verify_length(self, expected_lenght, msg):
        '''
        This function will read value from Length input box and verify with given expected_lenght value from user under alpha section.
        
        @param expected_lenght:'29'.
        @param msg: 'Step 9: Verify Length input box value.'
        :usage verify_length('29', 'Step 9: Verify Length input box value.')
        '''
        actual_length = str(DataFormat_Dialog.get_length(self))
        utillobject.asequal(self, expected_lenght, actual_length, msg)
    
    def modify_length_value_using_keybord_input(self, input_value):
        '''
        This function will change value from Length input box with given value from user under alpha section.
        
        @param input_value:'29'.
        :usage modify_length_value_using_keybord_input('29')
        '''
        self.driver.find_element_by_css_selector(DataFormat_Dialog.alpha_length_input_textbox_css).clear()
        utillobject.set_text_to_textbox_using_keybord(self, input_value, text_box_css=DataFormat_Dialog.alpha_length_input_textbox_css)
        utillobject.synchronize_with_visble_text(self, DataFormat_Dialog.alpha_length_input_textbox_css, input_value, 90, text_option='text_value') 
        
    def select_max_or_min_value_in_alpha_max_length_dropdown(self, value_type):
        '''
        This function is used to select the max or min value in the spinner box.
        value_type='max' or 'min'
        '''
        arrow_css = "div[class*='ibx-spinner-btn-up" if value_type == 'max' else "div[class*='ibx-spinner-btn-down"
        spinnerbox_elem=utillobject.validate_and_get_webdriver_object(self, DataFormat_Dialog.alpha_dataformat_box_css, 'Spinnerbox')
        current_value = str(DataFormat_Dialog.get_length(self)) 
        while True:
            spinnerbox_arrow_ele = utillobject.validate_and_get_webdriver_object(self, arrow_css, 'Spinnerbox arrow css', spinnerbox_elem)
            coreutilobj.left_click(self, spinnerbox_arrow_ele) 
            new_value = str(DataFormat_Dialog.get_length(self))
            if current_value == new_value :
                break
            current_value = new_value 
            
    def select_value_in_alpha_max_length_dropdown(self, value):
        '''
        This function is used to select max or min value based on user value.
        value=2
        '''
        current_value = int(DataFormat_Dialog.get_max_length(self))
        arrow_css = "div[class*='ibx-spinner-btn-up" if current_value < value else "div[class*='ibx-spinner-btn-down" 
        spinnerbox_elem=utillobject.validate_and_get_webdriver_object(self, DataFormat_Dialog.alpha_dataformat_box_css, 'Spinnerbox')
        while True :
            if current_value == value :
                break
            else :
                spinnerbox_arrow_ele = utillobject.validate_and_get_webdriver_object(self, arrow_css, 'Spinnerbox arrow css', spinnerbox_elem)
                coreutilobj.left_click(self, spinnerbox_arrow_ele) 
                current_value = int(DataFormat_Dialog.get_length(self))
    
    '''-----------------------------------------Date Type---------------------------------------------------'''
            
    def select_date_format(self, format_name):
        date_format_dropdown_arrow_css = DataFormat_Dialog.date_format_parent_css + " [data-ibx-name='dateFormat'] .ibx-select-open-btn"
        try:
            date_format_dropdown_arrow=self.driver.find_element_by_css_selector(date_format_dropdown_arrow_css)
        except NoSuchElementException:
            disp_msg='date format dropdown arrow is not visible at this moment.'
            raise LookupError(disp_msg)
        except ElementNotVisibleException:
            disp_msg='date format dropdown arrow is not visible at this moment.'
            raise LookupError(disp_msg)
        coreutilobj.left_click(self, date_format_dropdown_arrow)
        get_item=None
        for current_item in self.driver.find_elements_by_css_selector(DataFormat_Dialog.dropdown_popup_items_css):
            if current_item.text.strip() == format_name:
                get_item=True
                coreutilobj.left_click(self, current_item)
                break
        if get_item == None:
            raise ValueError('The requested item [' + format_name + '] is not available inside date format dropdown popup.')
    
    def verify_date_format(self, format_name, step_no):
        try:
            fromat_elem = self.driver.find_element_by_css_selector(DataFormat_Dialog.date_format_input_css)
        except NoSuchElementException:
            disp_msg='Date format input text is not visible at this moment.'
            raise LookupError(disp_msg)
        fromat_elem_value = utillobject.get_attribute_value(self, fromat_elem, 'text_value')
        date_format_value = fromat_elem_value['text_value']
        msg = 'Step {0}: Verify Date format value displays {1}.'.format(str(step_no), format_name)
        utillobject.asequal(self, format_name, date_format_value, msg)
            
    def select_date_separator(self, separator_name):
        date_format_dropdown_arrow_css = DataFormat_Dialog.date_format_parent_css + " [data-ibx-name='dateSeparator'] .ibx-select-open-btn"
        try:
            date_format_dropdown_arrow=self.driver.find_element_by_css_selector(date_format_dropdown_arrow_css)
        except NoSuchElementException:
            disp_msg='date separator dropdown arrow is not visible at this moment.'
            raise LookupError(disp_msg)
        coreutilobj.left_click(self, date_format_dropdown_arrow)
        get_item=None
        for current_item in self.driver.find_elements_by_css_selector(DataFormat_Dialog.dropdown_popup_items_css):
            if current_item.text.strip() == separator_name:
                get_item=True
                coreutilobj.left_click(self, current_item)
                break
        if get_item == None:
            raise ValueError('the requested item [' + separator_name + '] is not available inside date separator dropdown popup.')
    
    def verify_date_separator(self, separator_name, step_no):
        try:
            separator_elem = self.driver.find_element_by_css_selector(DataFormat_Dialog.date_separator_input_css)
        except NoSuchElementException:
            disp_msg='Date separator input text is not visible at this moment.'
            raise LookupError(disp_msg)
        separator_elem_value = utillobject.get_attribute_value(self, separator_elem, 'text_value')
        date_separator_value = separator_elem_value['text_value']
        msg = 'Step {0}: Verify Date separator value displays {1}.'.format(str(step_no), separator_name)
        utillobject.asequal(self, separator_name, date_separator_value, msg)
    
    '''-----------------------------------------Numeric Type---------------------------------------------------'''
    
    def verify_selected_numeric_datatype(self, numeric_datatype, msg, color_name='gray80'):
        step_no = re.search(r'\d+', msg).group()
        selected_datatype_class = 'radio-group-checked'
        if numeric_datatype not in ['integer', 'decimal', 'currency', 'percentage']:
            raise ValueError("Invalid numeric type provided. Please provide any of the applicable numeric type from ['integer', 'decimal', 'currency', 'percentage'].")
        individual_datatype_css = DataFormat_Dialog.numeric_format_type_group_css + " [data-ibxp-user-value='{0}']".format(numeric_datatype)
        data_type_elem = self.driver.find_element_by_css_selector(individual_datatype_css)
        class_detail = data_type_elem.get_attribute('class')
        actual_color_details = Color.from_string(data_type_elem.value_of_css_property('background-color')).rgba
        utillobject.asin(self, selected_datatype_class, class_detail, msg)
        expected_color_details = utillobject.color_picker(self, color_name, rgb_type='rgba')
        output_message="Step {0}.a: Verify if '{1}' type is highlighted with color '{2}'.".format(step_no, numeric_datatype, expected_color_details)
        utillobject.asequal(self, expected_color_details, actual_color_details, output_message)  
    
    def select_numeric_type(self, numeric_datatype):
        if numeric_datatype not in ['integer', 'decimal', 'currency', 'percentage']:
            raise ValueError("Invalid numeric type provided. Please provide any of the applicable numeric type from ['integer', 'decimal', 'currency', 'percentage'].")
        required_numeric_datatype_css = DataFormat_Dialog.numeric_format_type_group_css + " [data-ibxp-user-value='{0}']".format(numeric_datatype)
        required_numeric_datatype = self.driver.find_element_by_css_selector(required_numeric_datatype_css)
        coreutilobj.left_click(self, required_numeric_datatype) 
        
    def get_max_length(self):
        return self.driver.find_element_by_css_selector(DataFormat_Dialog.numeric_length_input_textbox_css).get_attribute('aria-valuenow')
    
    def select_max_or_min_value_in_numeric_max_length_dropdown(self, value_type):
        '''
        This function is used to select the max or min value in the spinner box.
        value_type='max' or 'min'
        '''
        arrow_css = "div[class*='ibx-spinner-btn-up" if value_type == 'max' else "div[class*='ibx-spinner-btn-down"
        spinnerbox_elem=utillobject.validate_and_get_webdriver_object(self, DataFormat_Dialog.numeric_dataformat_box_css, 'Spinnerbox')
        current_value = str(DataFormat_Dialog.get_max_length(self)) 
        while True:
            spinnerbox_arrow_ele = utillobject.validate_and_get_webdriver_object(self, arrow_css, 'Spinnerbox arrow css', spinnerbox_elem)
            coreutilobj.left_click(self, spinnerbox_arrow_ele) 
            new_value = str(DataFormat_Dialog.get_max_length(self))
            if current_value == new_value :
                break
            current_value = new_value 
            
    def select_value_in_numeric_max_length_dropdown(self, value):
        '''
        This function is used to select max or min value based on user value.
        value=2
        '''
        current_value = int(DataFormat_Dialog.get_max_length(self))
        arrow_css = "div[class*='ibx-spinner-btn-up" if current_value < value else "div[class*='ibx-spinner-btn-down" 
        spinnerbox_elem=utillobject.validate_and_get_webdriver_object(self, DataFormat_Dialog.numeric_dataformat_box_css, 'Spinnerbox')
        while True :
            if current_value == value :
                break
            else :
                spinnerbox_arrow_ele = utillobject.validate_and_get_webdriver_object(self, arrow_css, 'Spinnerbox arrow css', spinnerbox_elem)
                coreutilobj.left_click(self, spinnerbox_arrow_ele) 
                current_value = int(DataFormat_Dialog.get_max_length(self))

    def verify_max_length(self, expected_lenght, msg):
        actual_length = str(DataFormat_Dialog.get_max_length(self))
        utillobject.asequal(self, expected_lenght, actual_length, msg)
             
    def modify_max_length_value_using_keybord_input(self, input_value):
        self.driver.find_element_by_css_selector(DataFormat_Dialog.numeric_length_input_textbox_css).clear()
        utillobject.set_text_to_textbox_using_keybord(self, input_value, text_box_css=DataFormat_Dialog.numeric_length_input_textbox_css)
        utillobject.synchronize_with_visble_text(self, DataFormat_Dialog.numeric_length_input_textbox_css, input_value, 90, text_option='text_value') 
    
    def get_decimal_place(self):
        return self.driver.find_element_by_css_selector(DataFormat_Dialog.numeric_decimal_input_textbox_css).get_attribute('aria-valuenow')
    
    def verify_decimal_place(self, expected_lenght, msg):
        actual_length = str(DataFormat_Dialog.get_decimal_place(self))
        utillobject.asequal(self, expected_lenght, actual_length, msg)
             
    def modify_decimal_place_value_using_keybord_input(self, input_value):
        self.driver.find_element_by_css_selector(DataFormat_Dialog.numeric_decimal_input_textbox_css).clear()
        utillobject.set_text_to_textbox_using_keybord(self, input_value, text_box_css=DataFormat_Dialog.numeric_decimal_input_textbox_css)
        utillobject.synchronize_with_visble_text(self, DataFormat_Dialog.numeric_decimal_input_textbox_css, input_value, 90, text_option='text_value') 
    
    def select_negative_numbers(self, negative_number_type):
        '''
        This function will select negative numbers label.
        
        @param negative_number_type:'-123' or '(123)'
        :Usage select_negative_numbers('-123')
        '''
        negative_label_css = '{0} .wfc-df-negative-button'.format(DataFormat_Dialog.numeric_negative_groupbox_css)
        try:
            negative_label_elems = self.driver.find_elements_by_css_selector(negative_label_css)
        except NoSuchElementException:
            raise LookupError("Negative numbers label is not displayed currently in the webpage.")
        try:
            negative_label_elem_to_select = [elem for elem in negative_label_elems if elem.text.strip()==negative_number_type][0]
        except IndexError:
                error_msg="Requested {0} value is not displayed currently in the Negative numbers label.".format(negative_number_type)
                raise IndexError(error_msg)
        coreutilobj.left_click(self, negative_label_elem_to_select)
    
    def verify_negative_numbers(self, expected_selected_value=None, expected_nonselected_value=None, msg='step x:', color_name='gray80'):
        step_no = re.search(r'\d+', msg).group()
        selected_datatype_class = 'radio-group-checked'
        selected_value_css = '{0} .wfc-df-negative-button.checked'.format(DataFormat_Dialog.numeric_negative_groupbox_css)
        nonselected_value_css = '{0} .wfc-df-negative-button:not(.checked)'.format(DataFormat_Dialog.numeric_negative_groupbox_css)
        if expected_selected_value != None:
            try:
                data_type_elem = self.driver.find_element_by_css_selector(selected_value_css)
            except NoSuchElementException:
                error_msg="Requested selected value {0} is not displayed currently in the webpage.".format(expected_selected_value)
                raise LookupError(error_msg)
            actual_selected_value = data_type_elem.text.strip()
            output_message="Step {0}.a: Verify '{1}' is highlighted".format(step_no, expected_selected_value)
            utillobject.asequal(self, expected_selected_value, actual_selected_value, output_message)
            class_detail = data_type_elem.get_attribute('class')
            actual_color_details = Color.from_string(data_type_elem.value_of_css_property('background-color')).rgba
            utillobject.asin(self, selected_datatype_class, class_detail, msg)
            expected_color_details = utillobject.color_picker(self, color_name, rgb_type='rgba')
            output_message="Step {0}.b: Verify if '{1}' type is highlighted with color '{2}'.".format(step_no, expected_selected_value, expected_color_details)
            utillobject.asequal(self, expected_color_details, actual_color_details, output_message) 
        if expected_nonselected_value != None:
            try:
                actual_nonselected_value_elem = self.driver.find_element_by_css_selector(nonselected_value_css)
            except NoSuchElementException:
                error_msg="Requested non selected value {0} is not displayed currently in the webpage.".format(expected_nonselected_value)
                raise LookupError(error_msg)
            actual_nonselected_value = actual_nonselected_value_elem.text.strip()
            output_message="Step {0}.c: Verify '{1}' is the non selected value".format(step_no, expected_nonselected_value)
            utillobject.asequal(self, expected_nonselected_value, actual_nonselected_value, output_message)
    
    def get_displayed_currency_symbol(self):
        currency_symbol_inputbox_css = DataFormat_Dialog.numeric_currency_format_parent_css + " .wfc-df-currency-selector input"
        try:
            currency_symbol_inputbox_elem=self.driver.find_element_by_css_selector(currency_symbol_inputbox_css)
        except NoSuchElementException:
            disp_msg='Currency Symbol input box is not visible at this moment.'
            raise LookupError(disp_msg)
        return currency_symbol_inputbox_elem.get_attribute('value')
    
    def verify_currency_symbol(self, expected_currency_symbol_name, step_no):
        '''
        This function will verify currency symbol.
        User need to provide either 'Base on locale', 'Dollar', 'Euro', 'Pound sterling', 'Japanese yen'
        
        @param expected_currency_symbol_name: 'Base on locale' or 'Dollar' or 'Euro' or 'Pound sterling' or 'Japanese yen'
        @param step_no: '9'
        :usage verify_currency_symbol('Euro', '9')
        '''
        symbol_dict = {'Base on locale':'Base on locale', 'Dollar':'Dollar($)', 'Euro':'Euro(\u20ac)', 'Pound sterling':'Pound sterling(\u00A3)', 'Japanese yen':'Japanese yen(\u00A5)'}
        actual_currency_symbol_name=DataFormat_Dialog.get_displayed_currency_symbol(self)
        output_message="Step {0}.: Verify '{1}' is displayed in the currency symbol box.".format(step_no, expected_currency_symbol_name)
        utillobject.asequal(self, symbol_dict[expected_currency_symbol_name], actual_currency_symbol_name, output_message)
            
    def select_currency_symbol(self, currency_symbol_name):
        '''
        This function will select currency symbol from drop down. User need to provide only name no symbol allow here.
        User need to provide either 'Base on locale', 'Dollar', 'Euro', 'Pound sterling', 'Japanese yen'
        
        @param currency_symbol_name: 'Base on locale' or 'Dollar' or 'Euro' or 'Pound sterling' or 'Japanese yen'
        :usage select_currency_symbol('Euro')
        '''
        currency_symbol_dropdown_arrow_css = DataFormat_Dialog.numeric_currency_format_parent_css + " .wfc-df-currency-selector .ibx-select-open-btn"
        try:
            currency_symbol_dropdown_arrow_elem=self.driver.find_element_by_css_selector(currency_symbol_dropdown_arrow_css)
        except NoSuchElementException:
            disp_msg='Currency Symbol dropdown arrow is not visible at this moment.'
            raise LookupError(disp_msg)
        coreutilobj.left_click(self, currency_symbol_dropdown_arrow_elem)
        get_item=None
        drop_down_elem=self.driver.find_elements_by_css_selector(DataFormat_Dialog.dropdown_popup_items_css)
        if len(drop_down_elem) == 0:
            raise LookupError("Currency Symbol dropdown is not visible at this moment.")
        for current_item in drop_down_elem:
            if currency_symbol_name in current_item.text.strip():
                get_item=True
                coreutilobj.left_click(self, current_item)
                break
        if get_item == None:
            raise ValueError('The requested item [' + currency_symbol_name + '] is not available inside date format dropdown popup.')
    
    def verify_symbol_position(self, expected_selected_value=None, expected_nonselected_value=None, msg='step x:', color_name='gray80'):
        step_no = re.search(r'\d+', msg).group()
        selected_datatype_class = 'radio-group-checked'
        selected_value_css = '{0} .wfc-df-negative-button.checked'.format(DataFormat_Dialog.numeric_symbol_position_groupbox_css)
        nonselected_value_css = '{0} .wfc-df-negative-button:not(.checked)'.format(DataFormat_Dialog.numeric_symbol_position_groupbox_css)
        if expected_selected_value != None:
            try:
                data_type_elem = self.driver.find_element_by_css_selector(selected_value_css)
            except NoSuchElementException:
                error_msg="Requested selected value {0} is not displayed currently in the webpage.".format(expected_selected_value)
                raise LookupError(error_msg)
            actual_selected_value = data_type_elem.text.strip()
            output_message="Step {0}.a: Verify '{1}' is highlighted".format(step_no, expected_selected_value)
            utillobject.asequal(self, expected_selected_value, actual_selected_value, output_message)
            class_detail = data_type_elem.get_attribute('class')
            actual_color_details = Color.from_string(data_type_elem.value_of_css_property('background-color')).rgba
            utillobject.asin(self, selected_datatype_class, class_detail, msg)
            expected_color_details = utillobject.color_picker(self, color_name, rgb_type='rgba')
            output_message="Step {0}.b: Verify if '{1}' type is highlighted with color '{2}'.".format(step_no, expected_selected_value, expected_color_details)
            utillobject.asequal(self, expected_color_details, actual_color_details, output_message) 
        if expected_nonselected_value != None:
            try:
                actual_nonselected_value_elem = self.driver.find_element_by_css_selector(nonselected_value_css)
            except NoSuchElementException:
                error_msg="Requested non selected value {0} is not displayed currently in the webpage.".format(expected_nonselected_value)
                raise LookupError(error_msg)
            actual_nonselected_value = actual_nonselected_value_elem.text.strip()
            output_message="Step {0}.c: Verify '{1}' is the non selected value".format(step_no, expected_nonselected_value)
            utillobject.asequal(self, expected_nonselected_value, actual_nonselected_value, output_message)
    
    def verify_symbol_position_disabled(self, step_number):
        '''
        This function will verify the symbol position section is disabled.
        '''
        symbol_position_label_css = '{0} .wfc-df-position-label'.format(DataFormat_Dialog.numeric_format_parent_css)
        symbol_position_group_button_css = '{0} .wfc-df-position-group'.format(DataFormat_Dialog.numeric_format_parent_css)
        label_msg="Step {}.a: Verify 'Symbol position label' is disabled.".format(step_number)
        group_button_msg="Step {}.b: Verify 'Symbol position group button' is disabled.".format(step_number)
        symbol_position_label_elem = utillobject.validate_and_get_webdriver_object(self, symbol_position_label_css, 'Symbol position label')
        symbol_position_label_class_attributes = utillobject.get_element_attribute(self, symbol_position_label_elem, 'class')
        utillobject.asin(self, 'ibx-widget-disabled', symbol_position_label_class_attributes, label_msg)
        symbol_position_group_button_css = utillobject.validate_and_get_webdriver_object(self, symbol_position_group_button_css, 'Symbol position group button')
        symbol_position_group_class_attributes = utillobject.get_element_attribute(self, symbol_position_group_button_css, 'class')
        utillobject.asin(self, 'ibx-widget-disabled', symbol_position_group_class_attributes, group_button_msg)
    
    def select_symbol_position(self, symbol_position_type):
        '''
        This function will select symbol position either 'Fixed' or 'Floating'.
        
        @param symbol_position_type:'Fixed', 'Floating'.
        :usage select_symbol_position('Fixed')
        '''
        if symbol_position_type not in ['Fixed', 'Floating']:
            raise ValueError("Invalid symbol position type provided. Please provide any of the applicable symbol type from ['Fixed', 'Floating'].")
        individual_symbol_position_css = "{0} [data-ibxp-user-value='{1}']".format(DataFormat_Dialog.numeric_format_parent_css, symbol_position_type.lower())
        symbol_position_elem = self.driver.find_element_by_css_selector(individual_symbol_position_css)
        coreutilobj.left_click(self, symbol_position_elem)  
    
    '''-----------------------------------------Custom Type---------------------------------------------------'''
    
    def get_format(self):
        '''
        This function will read value from format input box under custom section.
        
        :usage get_format()
        '''
        try:
            format_elem = self.driver.find_element_by_css_selector(DataFormat_Dialog.custom_format_input_css)
        except NoSuchElementException:
            disp_msg='Format input text is not visible under custom section at this moment.'
            raise LookupError(disp_msg)
        format_elem_value = utillobject.get_attribute_value(self, format_elem, 'text_value')
        return format_elem_value['text_value']
    
    def verify_format(self, expected_format_value, step_no):
        '''
        This function will read value from format input box and verify with given expected_format_value from user under custom section.
        
        @param expected_format_value:'I8YYMD'.
        @param msg: 'Step 9: Verify Format input box value.'
        :usage verify_length('I8YYMD', 'Step 9: Verify Format input box value.')
        '''
        actual_format_value = str(DataFormat_Dialog.get_format(self))
        msg = 'Step {0}: Verify Format value displays {1}.'.format(str(step_no), expected_format_value)
        utillobject.asequal(self, expected_format_value, actual_format_value, msg)
    
    def modify_format_using_keybord_input(self, input_value):
        '''
        This function will change value from format input box with given value from user under custom section.
        
        @param input_value:'29'.
        :usage modify_format_using_keybord_input('29')
        '''
        try:
            format_elem = self.driver.find_element_by_css_selector(DataFormat_Dialog.custom_format_input_css)
        except NoSuchElementException:
            disp_msg='Format input text is not visible under custom section at this moment.'
            raise LookupError(disp_msg)
        utillobject.set_text_to_textbox_using_keybord(self, input_value, format_elem=format_elem)
        utillobject.synchronize_with_visble_text(self, DataFormat_Dialog.custom_format_input_css, input_value, 90, text_option='text_value')
        
    

 

    