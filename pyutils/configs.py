import configparser


def get_item(config_file_path, section, option):
    config = configparser.ConfigParser()
    config.read(config_file_path)
    return config.get(section, option)

def get_item_list(config_file_path, section, option):
    valye_list = get_item(config_file_path, section, option)
    valye_list = valye_list.split(',') if valye_list else []
    valye_list =  [x for x in valye_list if x != '']
    return valye_list

