<?php

class SettingsController extends CiiDashboardController
{
	public $layout = 'settings';

	/**
     * Specifies the access control rules.
     * @return array
     */
    public function accessRules()
    {   
        return array(
            array('allow',
            	'actions' => array('index'),
            	'users' => array('@'),
            	'expression' => 'UserRoles::model()->hasPermission("manage", Yii::app()->user->role)'
            ),
            array('deny') 
        );  
    }

	/**
	 * Provides "general" settings control
	 * @class GeneralSettings
	 */
	public function actionIndex()
	{		
		$this->render('settings', array(
			'model' => new GeneralSettings
		));
	}

	/**
	 * Provides basic email control
	 * @class EmailSettings
	 */
	public function actionEmail()
	{
		$this->render('email', array(
			'model' => new EmailSettings
		));
	}

	/**
	 * Provides "social" settings control
	 * @class GeneralSettings
	 */
	public function actionSocial()
	{
		$this->render('settings', array(
			'model' => new SocialSettings
		));
	}

	/**
	 * Provides "general" settings control
	 * @class GeneralSettings
	 */
	public function actionAnalytics()
	{
		$this->render('/analytics/form', array(
			'model' => new AnalyticsSettings
		));
	}

	/**
	 * Provides theme control settings
	 * @class ThemeSettings
	 */
	public function actionAppearance()
	{
		$this->render('theme', array(
			'model' => new ThemeSettings,
			'md' => new CMarkdownParser 	
		));
	}

	/**
	 * Provides control for Theme management
	 * @param  string $type The type we want to display
	 */
	public function actionTheme()
	{
		$theme = Cii::getConfig('theme', 'default');

		if (!file_exists(Yii::getPathOfAlias('webroot.themes.' . $theme) . DIRECTORY_SEPARATOR . 'Theme.php'))
			throw new CHttpException(400, Yii::t('Dashboard.main',  'The requested theme type is not set. Please set a theme before attempting to change theme settings'));

		Yii::import('webroot.themes.' . $theme . '.Theme');

		try {
			$model = new Theme();
		} catch(Exception $e) {
			throw new CHttpException(400,  Yii::t('Dashboard.main', 'The requested theme type is not set. Please set a theme before attempting to change theme settings'));
		}
		
		$this->render('settings', array(
			'model' => $model
		));
	}
}