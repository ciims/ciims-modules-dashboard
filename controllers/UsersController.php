<?php

class UsersController extends CiiDashboardController
{
	/**
	 * Tells Yii to render the settings layout
	 * @var string $layout
	 */
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
            	'expression' => 'UserRoles::model()->hasPermission("manage", Yii::app()->user->role)',
                'deniedCallback' => array($this, 'error')
            ),
            array('deny') 
        );  
    }

    /**
     * Renders the index view
     */
	public function actionIndex()
	{
		$this->render('index', array(
			'inviteform' 	=> new InvitationForm,
			'registerform' 	=> new RegisterForm,
            'user'          => new Users
		));
	}
}