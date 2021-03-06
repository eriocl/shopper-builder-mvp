const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      User, Bag, Size, Material,
    }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsToMany(Bag, { through: 'OrderEntries', foreignKey: 'order_id' });
      this.belongsToMany(Size, { through: 'OrderEntries', foreignKey: 'order_id' });
      this.belongsToMany(Material, { through: 'OrderEntries', foreignKey: 'order_id' });
    }
  }
  Order.init({
    price: DataTypes.INTEGER,
    paid: DataTypes.BOOLEAN,
    delivery_address: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
