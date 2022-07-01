import asyncWrapper from '../../middleware/asyncWrapper.js'
import * as getLocaleFile from '../../utils/locale/getLocaleFile.js'
import * as error from '../../utils/misc/errors/error.js'


const getLocale = asyncWrapper(async (req, res) => {

    const localeFile = await getLocaleFile(locale);

    res.status(200).json({
        success: true,
        data: localeFile,
    });

});

export default getLocale;