<?php

class DefaultController extends CiiDashboardController
{
    public function actionIndex()
    {
        // Fetch all the dashboard cards for the current user
    	$cards = UserMetadata::model()->getPrototype('UserMetadata', array(
    		'user_id' => Yii::app()->user->id,
    		'key' => 'dashboard_cards'
    	), array('value' => '{}'));

    	$cardData = array();
    	
        // Find all the metadata for those cards and load them
    	foreach (CJSON::decode($cards->value) as $id=>$url)
    	{
            $metadata = UserMetadata::model()->getPrototype('UserMetadata', array(
                'user_id' => Yii::app()->user->id,
                'key' => $id.'_card_settings'
            ), array('value' => '{}'));

            $val = CJSON::decode($metadata->value);
            $cardData[$id] = empty($val) ? null : $val;
    	}
    	
    	Yii::app()->clientScript->registerScript('DashboardCardList', 'Dashboard.cards = '.$cards->value.'; Dashboard.cardData = '.CJSON::encode($cardData));
        $this->render('index');
    }
}
